function menuLoadingError(message){
  const panel=document.querySelector('#menuLoadStatus');panel.replaceChildren();
  const text=document.createElement('p');text.textContent=message;
  const retry=document.createElement('button');retry.textContent='Повторить / Retry';retry.onclick=()=>location.reload();
  panel.append(text,retry);panel.hidden=false;
}
function applyLiveData(data){
  if(!Array.isArray(data.dishes)||!data.restaurant||!data.order)throw Error('Неполные данные меню.');
  const facts={};
  const dishes=data.dishes.map(dish=>{
    facts[dish.id]={available:dish.available,ingredients:dish.ingredients,allergens:dish.allergens,spiciness:dish.spiciness};
    const next={...dish};
    for(const field of ['name','desc'])next[field]=Object.fromEntries(['ru','kg','en'].map(lang=>[lang,dish[field]?.[lang]||dish[field]?.ru||'']));
    next.ingredients=next.ingredients||{};
    return next;
  });
  window.ALTYN_LIVE_MENU=dishes;
  window.ALTYN_RESTAURANT_CONFIG={...data.restaurant,dishes:facts};
  window.ALTYN_ORDER_CONFIG=data.order;
  window.ALTYN_MENU_REVISION=data.revision;
}
(async()=>{
 try{
  if(location.protocol!=='file:'){
    const response=await fetch('/api/public',{cache:'no-store',credentials:'same-origin',signal:AbortSignal.timeout(12000)});
    if(!response.ok)throw Error('Не удалось загрузить актуальное меню.');
    applyLiveData(await response.json());
    window.ALTYN_LIVE_SERVER=true;
  }
  const script=document.createElement('script');script.src='script.js';
  script.onload=()=>{document.querySelector('#menuLoadStatus').hidden=true};
  script.onerror=()=>menuLoadingError('Не удалось загрузить сайт. Повторите попытку.');
  document.body.append(script);
 }catch{menuLoadingError('Не удалось получить меню ресторана. Проверьте соединение и повторите попытку. При первой публикации проверьте Netlify Functions.');}
})();
