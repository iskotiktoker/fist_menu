import { randomToken, digest, passwordHash, verifyPassword, validHash } from './security.mjs';
const SESSION_LIFETIME = 8 * 60 * 60 * 1000;
const LANGS = ['ru','kg','en'];
class ApiError extends Error { constructor(status, message) { super(message); this.status=status; } }
const fail = (status, text) => { throw new ApiError(status,text); };
const check = (ok, text) => { if (!ok) fail(400,text); };
const plainText = (value, max=600) => typeof value === 'string' && value.length <= max && !/[\x00-\x08\x0b\x0c\x0e-\x1f<>]/.test(value);
const validPassword = value => typeof value === 'string' && value.length >= 12 && value.length <= 128;
function localized(value, name, nullable=false) {
  if (nullable && value === null) return null;
  check(value && typeof value === 'object' && !Array.isArray(value), `${name}: нужны тексты RU/KG/EN.`);
  const result={};
  for (const lang of LANGS) { check(plainText(value[lang] ?? '',1000), `${name}: недопустимый текст.`); result[lang]=(value[lang] || '').trim(); }
  if (!nullable) check(result.ru.length > 0, `${name}: заполните русский текст.`);
  return result;
}
function validateSchedule(value) {
  if (value === null) return null;
  check(value && typeof value === 'object' && !Array.isArray(value),'Некорректное расписание.');
  const result={};
  for (let day=0;day<7;day++) {
    const ranges=value[day];
    check(Array.isArray(ranges) && ranges.length <= 4,'Укажите все 7 дней недели (выходной — пустой список).');
    result[day]=ranges.map(pair=>{
      check(Array.isArray(pair) && pair.length===2 && pair.every(t=>typeof t==='string' && /^([01]\d|2[0-3]):[0-5]\d$/.test(t)) && pair[0]!==pair[1],'Проверьте время открытия и закрытия.');
      return [...pair];
    });
  }
  return result;
}
function safeImage(value) {
  if (typeof value !== 'string' || value.length > 2000) return false;
  try { const url=new URL(value); return url.protocol==='https:' && !url.username && !url.password; } catch { return false; }
}
function validateDish(input, current, categories, role) {
  check(input && typeof input==='object' && !Array.isArray(input),'Некорректные данные блюда.');
  if (role === 'admin') {
    check(Object.keys(input).length === 1 && typeof input.available === 'boolean','Администратор может менять только наличие блюд.');
    return {...current,available:input.available};
  }
  const allowed=['name','desc','ingredients','allergens','spiciness','price','image','category','weight','calories','time','popular','isNew','available','archived'];
  check(Object.keys(input).every(key=>allowed.includes(key)),'Неизвестное поле блюда.');
  const next={...current};
  for(const [key,value] of Object.entries(input)) {
    if (['name','desc'].includes(key)) next[key]=localized(value,key);
    else if (['ingredients','allergens'].includes(key)) next[key]=localized(value,key,true);
    else if (['available','archived','popular','isNew'].includes(key)) { check(typeof value==='boolean',`Некорректное значение ${key}.`); next[key]=value; }
    else if (key==='price') { check(Number.isSafeInteger(value) && value>0 && value<=1000000,'Цена: целое число от 1 до 1 000 000 сом.'); next.price=value; }
    else if(key==='spiciness') { check(value===null || Number.isInteger(value) && value>=0 && value<=3,'Острота: 0–3 или пусто.'); next[key]=value; }
    else if(key==='image') { check(safeImage(value),'Фото: укажите полную HTTPS-ссылку.');next[key]=value; }
    else if(key==='category') { check(categories.some(c=>c.id===value),'Выберите существующую категорию.');next[key]=value; }
    else { check(plainText(value,100),`Проверьте поле ${key}.`);next[key]=value; }
  }
  return next;
}
function validateSettings(body, state) {
  check(body && typeof body==='object','Некорректные настройки.');
  check(Object.keys(body).every(k=>['restaurant','order'].includes(k)),'Неизвестные настройки.');
  const restaurant={...state.restaurant};const order=structuredClone(state.order);
  if(body.restaurant) {
    check(Object.keys(body.restaurant).every(k=>['phone','address','mapUrl','hours','deliveryHours'].includes(k)),'Неизвестные настройки ресторана.');
    for(const [key,value]of Object.entries(body.restaurant)){
      if(key==='hours'||key==='deliveryHours')restaurant[key]=validateSchedule(value);
      else if(key==='phone'){check(typeof value==='string' && /^\+?\d{7,15}$/.test(value),'Проверьте телефон.');restaurant.phone=value;}
      else if(key==='mapUrl'){check(value==='' || safeImage(value),'Карта: нужна HTTPS-ссылка.');restaurant.mapUrl=value;}
      else {check(plainText(value,300),'Проверьте адрес.');restaurant.address=value;}
    }
  }
  if(body.order){
    check(Object.keys(body.order).every(k=>['whatsappNumber','deliveryFees'].includes(k)),'Неизвестные настройки заказов.');
    if(body.order.whatsappNumber!==undefined){check(/^\d{7,15}$/.test(body.order.whatsappNumber),'Номер WhatsApp: 7–15 цифр без пробелов.');order.whatsappNumber=body.order.whatsappNumber;}
    if(body.order.deliveryFees){
      for(const key of ['city','outside']){const n=body.order.deliveryFees[key];check(Number.isSafeInteger(n)&&n>=0&&n<=100000,'Проверьте тарифы доставки.');}
      order.deliveryFees={city:body.order.deliveryFees.city,outside:body.order.deliveryFees.outside};
    }
  }
  return {restaurant,order};
}
function safeUser(user) { return {username:user.username,active:user.active,role:'admin'}; }
function publicMenu(state) {
  return { revision:state.revision, categories:state.categories, dishes:state.dishes.filter(d=>!d.archived), restaurant:state.restaurant, order:state.order };
}

// Store is injected, so the permission checks can be exercised without cloud credentials.
export function createService({store,seed,env={},now=()=>Date.now()}) {
  const ownerName=env.OWNER_LOGIN || 'founder';
  const ownerHash=env.OWNER_PASSWORD_HASH || '';
  const ownerConfigured=validHash(ownerHash);
  const baseState=()=>({...structuredClone(seed),users:[],audit:[],revision:randomToken()});
  async function readState(){
    const entry=await store.getWithMetadata('state',{type:'json'});
    if (entry) return {state:entry.data,etag:entry.etag};
    const initial=baseState();
    const created=await store.setJSON('state',initial,{onlyIfNew:true});
    if (created.modified && created.etag) return {state:initial,etag:created.etag};
    const existing=await store.getWithMetadata('state',{type:'json'});
    if (!existing) fail(503,'Не удалось подготовить хранилище меню.');
    return {state:existing.data,etag:existing.etag};
  }
  async function writeState(state,etag){
    state.revision=randomToken();
    const result=await store.setJSON('state',state,etag?{onlyIfMatch:etag}:{onlyIfNew:true});
    if(!result.modified)fail(409,'Данные уже изменились. Обновите панель и повторите действие.');
    if(!result.etag)fail(503,'Хранилище не подтвердило сохранение. Обновите панель и проверьте данные.');
  }
  async function account(username,state){
    if(ownerConfigured && username===ownerName)return {username,role:'owner',active:true,hash:ownerHash,version:digest(ownerHash)};
    const user=state.users.find(u=>u.username===username);
    return user && {...user,role:'admin'};
  }
  async function auth(request,state){
    const cookie=request.headers.get('cookie') || '';
    const token=cookie.split(';').map(s=>s.trim()).find(s=>s.startsWith('altyn_session='))?.slice(14);
    if(!token || !/^[A-Za-z0-9_-]{43}$/.test(token))fail(401,'Войдите в панель.');
    const key='sessions/'+digest(token);
    const session=await store.get(key,{type:'json'});
    if(!session || session.expires<=now())fail(401,'Сессия истекла. Войдите снова.');
    const user=await account(session.username,state);
    if(!user || !user.active || session.version!==user.version)fail(401,'Доступ отозван. Войдите снова.');
    return {...user,csrf:session.csrf,key};
  }
  function sameOrigin(request){
    const url=new URL(request.url);
    const origin=request.headers.get('origin');
    if(!origin || origin!==url.origin)fail(403,'Запрос должен быть отправлен с сайта ресторана.');
    if(url.protocol!=='https:' && !['localhost','127.0.0.1'].includes(url.hostname))fail(403,'Для входа и изменений нужен HTTPS.');
  }
  function response(data,status=200,headers={}){
    return new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','X-Frame-Options':'DENY',...headers}});
  }
  async function bodyOf(request){
    check(request.headers.get('content-type')?.startsWith('application/json'),'Ожидается JSON.');
    const text=await request.text();if(text.length>60000)fail(413,'Слишком большой запрос.');
    let parsed; try{parsed=JSON.parse(text)}catch{fail(400,'Некорректный JSON.')}
    check(parsed && typeof parsed==='object' && !Array.isArray(parsed),'Ожидается объект JSON.'); return parsed;
  }
  function log(state,user,action,target){state.audit.unshift({at:new Date(now()).toISOString(),by:user.username,action,target});state.audit=state.audit.slice(0,200);}
  return async function handle(request){
    try{
      const url=new URL(request.url);
      const path=url.pathname.replace(/^\/(?:api|\.netlify\/functions\/(?:api|login))(?=\/|$)/,'') || '/';
      const route=url.pathname.endsWith('/login')?'/login':path;
      const {state,etag}=await readState();
      if(request.method==='GET' && route==='/public')return response(publicMenu(state));
      if(request.method==='POST')sameOrigin(request);
      if(request.method==='PATCH')sameOrigin(request);
      if(route==='/login' && request.method==='POST'){
        if(!ownerConfigured)fail(503,'Владелец ещё не настроил вход. Нужны переменные Netlify OWNER_LOGIN и OWNER_PASSWORD_HASH.');
        const body=await bodyOf(request);
        check(typeof body.username==='string' && body.username.length<=40 && typeof body.password==='string' && body.password.length<=128,'Проверьте логин и пароль.');
        const user=await account(body.username,state);
        // Unknown names perform the same expensive password check as real accounts.
        const ok=await verifyPassword(body.password,user?.hash || ownerHash);
        if(!ok || !user?.active)fail(401,'Неверный логин или пароль.');
        const token=randomToken();const csrf=randomToken();
        await store.setJSON('sessions/'+digest(token),{username:user.username,version:user.version,csrf,expires:now()+SESSION_LIFETIME});
        const secure=url.protocol==='https:'?'; Secure':'';
        return response({username:user.username,role:user.role,csrf},200,{'Set-Cookie':`altyn_session=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${SESSION_LIFETIME/1000}${secure}`});
      }
      const user=await auth(request,state);
      if(request.method!=='GET' && request.headers.get('x-csrf-token')!==user.csrf)fail(403,'Сессия изменилась. Обновите страницу.');
      if(route==='/session' && request.method==='GET')return response({username:user.username,role:user.role,csrf:user.csrf});
      if(route==='/logout' && request.method==='POST'){
        await store.delete(user.key);
        return response({ok:true},200,{'Set-Cookie':'altyn_session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0; Secure'});
      }
      if(route==='/dishes' && request.method==='GET')return response({dishes:state.dishes,categories:state.categories,revision:state.revision});
      if(route==='/settings' && request.method==='GET'){
        if(user.role!=='owner')fail(403,'Настройки доступны только владельцу.');
        return response({restaurant:state.restaurant,order:state.order,revision:state.revision});
      }
      if(route==='/users' && request.method==='GET'){
        if(user.role!=='owner')fail(403,'Управление сотрудниками доступно только владельцу.');
        return response({users:state.users.map(safeUser),ownerLogin:ownerName,revision:state.revision});
      }
      if(route==='/audit' && request.method==='GET'){
        if(user.role!=='owner')fail(403,'Журнал доступен только владельцу.');
        return response({audit:state.audit});
      }
      const body=await bodyOf(request);
      if(body.revision!==state.revision)fail(409,'Меню уже изменилось. Обновите данные перед сохранением.');
      if(route==='/logout')fail(405,'Недопустимый метод.');
      const dishMatch=route.match(/^\/dishes\/(\d+)$/);
      if(dishMatch && request.method==='PATCH'){
        const index=state.dishes.findIndex(d=>d.id===Number(dishMatch[1]));
        if(index<0)fail(404,'Блюдо не найдено.');
        state.dishes[index]=validateDish(body.changes,state.dishes[index],state.categories,user.role);
        log(state,user,'dish.update',dishMatch[1]);await writeState(state,etag);
        return response({dish:state.dishes[index],revision:state.revision});
      }
      if(user.role!=='owner')fail(403,'Действие доступно только владельцу.');
      if(route==='/dishes' && request.method==='POST'){
        check(state.dishes.length<1000,'Достигнут предел 1000 блюд.');
        const dish=validateDish(body.dish,{id:Math.max(0,...state.dishes.map(d=>d.id))+1,available:true,archived:false,popular:false,isNew:false,ingredients:null,allergens:null,spiciness:null,weight:'',calories:'',time:''},state.categories,'owner');
        check(dish.name && dish.desc && dish.price && dish.image && dish.category,'Заполните название, описание, цену, фото и категорию.');
        state.dishes.push(dish);log(state,user,'dish.create',String(dish.id));await writeState(state,etag);return response({dish,revision:state.revision},201);
      }
      if(route==='/settings' && request.method==='PATCH'){
        Object.assign(state,validateSettings(body.changes,state));log(state,user,'settings.update','restaurant');await writeState(state,etag);return response({revision:state.revision});
      }
      if(route==='/users' && request.method==='POST'){
        check(typeof body.username==='string' && /^[a-zA-Z0-9_-]{3,40}$/.test(body.username),'Логин: 3–40 латинских букв, цифр, _ или -.');
        check(body.username!==ownerName && !state.users.some(u=>u.username===body.username),'Этот логин уже занят.');
        check(state.users.length<50,'Достигнут предел 50 сотрудников.');
        check(validPassword(body.password),'Пароль: от 12 до 128 символов.');
        const staff={username:body.username,hash:await passwordHash(body.password),version:randomToken(),active:true};
        state.users.push(staff);log(state,user,'staff.create',staff.username);await writeState(state,etag);return response({user:safeUser(staff),revision:state.revision},201);
      }
      const staffMatch=route.match(/^\/users\/([a-zA-Z0-9_-]+)$/);
      if(staffMatch && request.method==='PATCH'){
        const target=state.users.find(u=>u.username===staffMatch[1]);if(!target)fail(404,'Сотрудник не найден.');
        check(body.changes && Object.keys(body.changes).every(k=>['active','password'].includes(k)),'Можно менять пароль и доступ сотрудника.');
        if(body.changes.active!==undefined){check(typeof body.changes.active==='boolean','Проверьте статус доступа.');target.active=body.changes.active;}
        if(body.changes.password!==undefined){check(validPassword(body.changes.password),'Пароль: от 12 до 128 символов.');target.hash=await passwordHash(body.changes.password);}
        target.version=randomToken();log(state,user,'staff.update',target.username);await writeState(state,etag);return response({user:safeUser(target),revision:state.revision});
      }
      fail(404,'Действие не найдено.');
    }catch(error){
      if(error instanceof ApiError)return response({error:error.message},error.status);
      console.error('ALTYN API error:',error.name);
      return response({error:'Сервис временно недоступен. Повторите позже.'},503);
    }
  };
}
