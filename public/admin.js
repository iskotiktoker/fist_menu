const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
let session=null, revision='', menu=[], categories=[], settings=null, editingId=null, resetUsername='';
const say = message => { $('#notice').textContent=message; };
function loginView() { session=null;$('#workspace').hidden=true;$('#loginPanel').hidden=false;$('#identity').textContent=''; }
async function api(path,method='GET',body) {
  const response=await fetch('/api'+path,{method,credentials:'same-origin',cache:'no-store',headers:{...(body?{'Content-Type':'application/json'}:{}),...(session?.csrf?{'X-CSRF-Token':session.csrf}:{})},body:body?JSON.stringify(body):undefined});
  let data;try{data=await response.json()}catch{throw Error('Сервер не вернул данные. Проверьте публикацию Netlify Functions.');}
  if(!response.ok){if(response.status===401)loginView();throw Error(data.error || 'Не удалось выполнить действие.');}
  if(data.revision)revision=data.revision;
  return data;
}
async function task(button,work) {
  if(button)button.disabled=true;
  try{await work()}catch(error){say(error.message)}finally{if(button)button.disabled=false}
}
function node(tag,text,className) { const element=document.createElement(tag);if(text!==undefined)element.textContent=text;if(className)element.className=className;return element; }
function action(text,fn){const button=node('button',text);button.type='button';button.onclick=()=>task(button,fn);return button;}
async function loadMenu(){const data=await api('/dishes');menu=data.dishes;categories=data.categories;renderMenu();}
function renderMenu(){
 const query=$('#dishSearch').value.toLocaleLowerCase().trim();const list=$('#dishList');list.replaceChildren();
 const shown=menu.filter(d=>(!d.archived || session.role==='owner' && $('#includeArchived').checked) && (d.name.ru.toLocaleLowerCase().includes(query)||String(d.id)===query));
 if(!shown.length)list.append(node('p','Блюда не найдены.'));
 shown.forEach(d=>{
  const row=node('article',undefined,'dish-row');
  row.append(node('span',d.archived?'Скрыто':d.available?'В наличии':'Закончилось','status'+(!d.available||d.archived?' off':'')),node('h3',d.name.ru),node('p',`№${d.id} · ${d.price} сом · ${categories.find(c=>c.id===d.category)?.title.ru || d.category}`,'dish-meta'));
  const actions=node('div',undefined,'row-actions');
  actions.append(action(d.available?'Отметить «Закончилось»':'Вернуть в наличие',async()=>{
   await api('/dishes/'+d.id,'PATCH',{revision,changes:{available:!d.available}});await loadMenu();say('Наличие сохранено. Клиенты увидят изменение при обновлении меню.');
  }));
  if(session.role==='owner')actions.append(action('Изменить',()=>editDish(d)));
  row.append(actions);list.append(row);
 });
}
function translatedFields() {
 const target=$('#dishLanguages');
 for(const [lang,title] of [['ru','Русский'],['kg','Кыргызский'],['en','Английский']]){
  const details=node('details');details.open=lang==='ru';details.append(node('summary',title));
  for(const [key,label]of [['name','Название'],['desc','Описание'],['ingredients','Точный состав'],['allergens','Аллергены']]){
   const holder=node('label',label+(key==='name'&&lang==='ru'?' *':''));
   const input=node(key==='name'?'input':'textarea');input.name=key+'_'+lang;input.maxLength=1000;
   input.required=lang==='ru' && (key==='name'||key==='desc');if(key!=='name')input.rows=2;
   holder.append(input);details.append(holder);
  }
  target.append(details);
 }
}
function editDish(dish){
 editingId=dish?.id ?? null;const form=$('#dishForm');form.reset();
 $('#dishEditorTitle').textContent=dish?'Изменить блюдо №'+dish.id:'Новое блюдо';
 form.elements.category.replaceChildren(...categories.map(c=>{const option=node('option',c.title.ru);option.value=c.id;return option}));
 for(const key of ['price','category','image','weight','calories','time','spiciness'])form.elements[key].value=dish?.[key]??'';
 for(const key of ['available','popular','isNew','archived'])form.elements[key].checked=dish?!!dish[key]:key==='available';
 for(const lang of ['ru','kg','en'])for(const key of ['name','desc','ingredients','allergens'])form.elements[key+'_'+lang].value=dish?.[key]?.[lang]||'';
 $('#dishDialog').showModal();
}
function readDishForm(form){
 const result={};for(const key of ['category','image','weight','calories','time'])result[key]=form.elements[key].value.trim();
 result.price=Number(form.elements.price.value);result.spiciness=form.elements.spiciness.value===''?null:Number(form.elements.spiciness.value);
 for(const key of ['available','popular','isNew','archived'])result[key]=form.elements[key].checked;
 for(const key of ['name','desc','ingredients','allergens']){
  const value=Object.fromEntries(['ru','kg','en'].map(lang=>[lang,form.elements[key+'_'+lang].value.trim()]));
  result[key]=['ingredients','allergens'].includes(key) && Object.values(value).every(v=>!v)?null:value;
 }
 return result;
}
function fillHours(targetId,schedule,prefix){
 const target=$(targetId);target.replaceChildren();const labels=['Вс','Пн','Вт','Ср','Чт','Пт','Сб'];
 [1,2,3,4,5,6,0].forEach(day=>{const label=node('label',labels[day]);const input=node('input');input.name=prefix+day;input.placeholder='Выходной';input.maxLength=100;input.value=schedule?.[day]?.map(pair=>pair.join('-')).join(', ')||'';label.append(input);target.append(label)});
}
function readHours(form,prefix){return Object.fromEntries(Array.from({length:7},(_,day)=>{
 const text=form.elements[prefix+day].value.trim();if(!text)return [day,[]];
 const ranges=text.split(',').map(range=>{const match=range.trim().match(/^(\d{2}:\d{2})\s*[-–]\s*(\d{2}:\d{2})$/);if(!match)throw Error('Проверьте расписание: формат 09:00-00:00.');return [match[1],match[2]]});return [day,ranges];
}));}
async function loadSettings(){
 settings=await api('/settings');const form=$('#settingsForm');
 for(const key of ['address','mapUrl','phone'])form.elements[key].value=settings.restaurant[key]||'';
 form.elements.whatsappNumber.value=settings.order.whatsappNumber;
 for(const key of ['city','outside'])form.elements[key].value=settings.order.deliveryFees[key];
 fillHours('#hoursEditor',settings.restaurant.hours,'hours_');fillHours('#deliveryHoursEditor',settings.restaurant.deliveryHours,'delivery_');
}
async function loadUsers(){
 const data=await api('/users');const list=$('#userList');list.replaceChildren();
 list.append(node('p','Владелец: '+data.ownerLogin));
 if(!data.users.length)list.append(node('p','Администраторы пока не добавлены.'));
 data.users.forEach(user=>{const row=node('article',undefined,'user-row');row.append(node('h3',user.username),node('p',user.active?'Доступ включён':'Доступ отключён'));const buttons=node('div',undefined,'row-actions');
 buttons.append(action(user.active?'Отключить доступ':'Включить доступ',async()=>{await api('/users/'+encodeURIComponent(user.username),'PATCH',{revision,changes:{active:!user.active}});await loadUsers();say('Доступ сотрудника обновлён.')}),action('Сменить пароль',()=>{resetUsername=user.username;$('#resetUserLabel').textContent=user.username;$('#resetPasswordForm').reset();$('#passwordDialog').showModal()}));row.append(buttons);list.append(row)});
}
async function loadAudit(){
 const data=await api('/audit');const list=$('#auditList');list.replaceChildren();
 const labels={'dish.update':'Изменение блюда','dish.create':'Добавление блюда','settings.update':'Настройки ресторана','staff.create':'Добавление администратора','staff.update':'Изменение доступа сотрудника'};
 if(!data.audit.length)list.append(node('p','Изменений пока нет.'));
 data.audit.forEach(entry=>{const row=node('article',`${labels[entry.action]||entry.action} · ${entry.target}`,'audit-row');row.append(node('small',`${entry.by} · ${new Date(entry.at).toLocaleString('ru-RU',{timeZone:'Asia/Bishkek'})}`));list.append(row)});
}
async function showTab(name){
 if(name!=='menu' && session.role!=='owner')return;
 for(const tab of ['menu','settings','users','audit'])$('#tab-'+tab).hidden=tab!==name;
 $$('[data-tab]').forEach(button=>button.classList.toggle('selected',button.dataset.tab===name));
 if(name==='menu')await loadMenu();if(name==='settings')await loadSettings();if(name==='users')await loadUsers();if(name==='audit')await loadAudit();
}
async function enter(data){
 session=data;$('#loginPanel').hidden=true;$('#workspace').hidden=false;
 $('#identity').textContent=`${data.username} · ${data.role==='owner'?'Владелец':'Администратор'}`;
 $$('[data-owner]').forEach(element=>{element.hidden=data.role!=='owner'});
 $('#roleHelp').textContent=data.role==='owner'?'Управляйте ценами, блюдами и их наличием.':'Отмечайте, какие блюда доступны для заказа.';
 await showTab('menu');
}
$('#loginForm').onsubmit=event=>{event.preventDefault();const form=event.target;task(form.querySelector('button'),async()=>{const data=await api('/login','POST',{username:form.elements.username.value.trim(),password:form.elements.password.value});form.elements.password.value='';say('');await enter(data)})};
$('#logout').onclick=()=>task($('#logout'),async()=>{await api('/logout','POST',{});loginView();say('Вы вышли из панели.')});
$$('[data-tab]').forEach(button=>{button.onclick=()=>task(button,()=>showTab(button.dataset.tab))});
$('#dishSearch').oninput=renderMenu;$('#includeArchived').onchange=renderMenu;
$('#reloadMenu').onclick=()=>task($('#reloadMenu'),loadMenu);$('#newDish').onclick=()=>editDish(null);
$('#closeDishEditor').onclick=()=>$('#dishDialog').close();
$('#dishForm').onsubmit=event=>{event.preventDefault();const form=event.target;task(form.querySelector('[type=submit]'),async()=>{const data=readDishForm(form);await api(editingId?'/dishes/'+editingId:'/dishes',editingId?'PATCH':'POST',editingId?{revision,changes:data}:{revision,dish:data});$('#dishDialog').close();await loadMenu();say('Блюдо сохранено.')})};
$('#settingsForm').onsubmit=event=>{event.preventDefault();const form=event.target;task(form.querySelector('[type=submit]'),async()=>{
 const restaurant={};for(const key of ['address','mapUrl','phone'])restaurant[key]=form.elements[key].value.trim();restaurant.hours=readHours(form,'hours_');restaurant.deliveryHours=readHours(form,'delivery_');
 const order={whatsappNumber:form.elements.whatsappNumber.value.trim(),deliveryFees:{city:Number(form.elements.city.value),outside:Number(form.elements.outside.value)}};
 await api('/settings','PATCH',{revision,changes:{restaurant,order}});await loadSettings();say('Настройки сохранены.')
})};
$('#createUserForm').onsubmit=event=>{event.preventDefault();const form=event.target;task(form.querySelector('button'),async()=>{await api('/users','POST',{revision,username:form.elements.username.value.trim(),password:form.elements.password.value});form.reset();await loadUsers();say('Администратор добавлен. Передайте ему логин и пароль лично.')})};
$('#closePasswordEditor').onclick=()=>$('#passwordDialog').close();
$('#resetPasswordForm').onsubmit=event=>{event.preventDefault();const form=event.target;task(form.querySelector('[type=submit]'),async()=>{await api('/users/'+encodeURIComponent(resetUsername),'PATCH',{revision,changes:{password:form.elements.password.value}});form.reset();$('#passwordDialog').close();say('Пароль обновлён. Старые сессии сотрудника завершены.')})};
$('#reloadAudit').onclick=()=>task($('#reloadAudit'),loadAudit);
$('#exportMenu').onclick=()=>task($('#exportMenu'),async()=>{
 const dishes=await api('/dishes');const config=await api('/settings');
 const url=URL.createObjectURL(new Blob([JSON.stringify({exportedAt:new Date().toISOString(),dishes:dishes.dishes,categories:dishes.categories,restaurant:config.restaurant,order:config.order},null,2)],{type:'application/json'}));
 const link=node('a');link.href=url;link.download='altyn-menu-backup.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);say('Копия скачана. Учётные записи и пароли в неё не включены.');
});
translatedFields();
(async()=>{try{await enter(await api('/session'))}catch(error){loginView();if(!error.message.includes('Войдите'))say(error.message)}})();
