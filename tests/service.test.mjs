import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createService } from '../lib/service.mjs';
import { passwordHash, verifyPassword } from '../lib/security.mjs';
const seed=JSON.parse(readFileSync(new URL('../lib/menu-seed.json',import.meta.url),'utf8'));
class MemoryStore {
  values=new Map();counter=0;
  async getWithMetadata(key){const entry=this.values.get(key);return entry?structuredClone(entry):null}
  async get(key){return structuredClone(this.values.get(key)?.data??null)}
  async setJSON(key,data,options={}){
    const old=this.values.get(key);
    if(options.onlyIfNew&&old || options.onlyIfMatch&&old?.etag!==options.onlyIfMatch)return {modified:false};
    const etag='"'+(++this.counter)+'"';this.values.set(key,{data:structuredClone(data),etag});return {modified:true,etag};
  }
  async delete(key){this.values.delete(key)}
}
const ownerPassword='Owner secure password 42';
const ownerHash=await passwordHash(ownerPassword);
function fixture(){
 const store=new MemoryStore();let time=Date.now();
 const service=createService({store,seed,env:{OWNER_LOGIN:'founder',OWNER_PASSWORD_HASH:ownerHash},now:()=>time});
 async function call(path,method='GET',body,session,extra={}){
  const headers={...(method!=='GET'?{'Origin':'https://example.test','Content-Type':'application/json'}:{}),...(session?{'cookie':session.cookie,'x-csrf-token':session.csrf}:{}),...extra};
  const res=await service(new Request('https://example.test/api'+path,{method,headers,body:body===undefined?undefined:JSON.stringify(body)}));
  return {status:res.status,data:await res.json(),cookie:res.headers.get('set-cookie')?.split(';')[0],headers:res.headers};
 }
 async function login(username='founder',password=ownerPassword){const result=await call('/login','POST',{username,password});assert.equal(result.status,200);return {cookie:result.cookie,csrf:result.data.csrf}}
 return {store,call,login,advance:ms=>{time+=ms}};
}
test('seed hours and public data contain no credentials',async()=>{
 const f=fixture();const result=await f.call('/public');assert.equal(result.status,200);assert.equal(result.data.dishes.length,64);
 assert.deepEqual(result.data.restaurant.hours[1],[['09:00','00:00']]);assert.deepEqual(result.data.restaurant.deliveryHours[1],[['10:00','23:00']]);
 assert(!JSON.stringify(result.data).includes('scrypt$'));assert(!('users'in result.data));assert(!('audit'in result.data));
});
test('owner login requires real password, same-origin and secure session',async()=>{
 const f=fixture();assert.equal((await f.call('/dishes')).status,401);
 assert.equal((await f.call('/login','POST',{username:'founder',password:'wrong'})).status,401);
 assert.equal((await f.call('/login','POST',{username:'founder',password:ownerPassword},null,{Origin:'https://evil.test'})).status,403);
 const result=await f.call('/login','POST',{username:'founder',password:ownerPassword});assert.equal(result.status,200);
 assert.match(result.headers.get('set-cookie'),/HttpOnly/);assert.match(result.headers.get('set-cookie'),/Secure/);assert.match(result.headers.get('set-cookie'),/SameSite=Strict/);
 const s={cookie:result.cookie,csrf:result.data.csrf};assert.equal((await f.call('/session','GET',undefined,s)).data.role,'owner');
 f.advance(9*60*60*1000);assert.equal((await f.call('/session','GET',undefined,s)).status,401);
});
test('unconfigured deployment has no default owner credentials',async()=>{
 const service=createService({store:new MemoryStore(),seed});
 const response=await service(new Request('https://example.test/api/login',{method:'POST',headers:{Origin:'https://example.test','Content-Type':'application/json'},body:JSON.stringify({username:'founder',password:'admin'})}));assert.equal(response.status,503);
});
test('owner changes prices; stale edits and missing CSRF are rejected',async()=>{
 const f=fixture(),s=await f.login();let menu=await f.call('/dishes','GET',undefined,s);
 const body={revision:menu.data.revision,changes:{price:777}};
 assert.equal((await f.call('/dishes/1','PATCH',body,s,{'x-csrf-token':'bad'})).status,403);
 assert.equal((await f.call('/dishes/1','PATCH',body,s,{Origin:'https://evil.test'})).status,403);
 assert.equal((await f.call('/dishes/1','PATCH',body,s)).status,200);
 assert.equal((await f.call('/dishes/2','PATCH',body,s)).status,409);
 assert.equal((await f.call('/public')).data.dishes.find(d=>d.id===1).price,777);
 menu=await f.call('/dishes','GET',undefined,s);
 assert.equal((await f.call('/dishes/1','PATCH',{revision:menu.data.revision,changes:{price:-1}},s)).status,400);
});
test('administrators can change stock, cannot edit prices/settings/accounts, and can be revoked',async()=>{
 const f=fixture(),owner=await f.login();let revision=(await f.call('/dishes','GET',undefined,owner)).data.revision;
 assert.equal((await f.call('/users','POST',{revision,username:'staff1',password:'Staff password 12345'},owner)).status,201);
 const staff=await f.login('staff1','Staff password 12345');let menu=await f.call('/dishes','GET',undefined,staff);
 assert.equal((await f.call('/dishes/1','PATCH',{revision:menu.data.revision,changes:{available:false}},staff)).status,200);
 assert.equal((await f.call('/public')).data.dishes[0].available,false);
 revision=(await f.call('/dishes','GET',undefined,staff)).data.revision;
 assert.equal((await f.call('/dishes/1','PATCH',{revision,changes:{price:1}},staff)).status,400);
 assert.equal((await f.call('/settings','GET',undefined,staff)).status,403);
 assert.equal((await f.call('/users','GET',undefined,staff)).status,403);
 assert.equal((await f.call('/audit','GET',undefined,staff)).status,403);
 assert.equal((await f.call('/users','POST',{revision,username:'hacker',password:'Hacker password 1234'},staff)).status,403);
 assert.equal((await f.call('/users/staff1','PATCH',{revision,changes:{active:false}},owner)).status,200);
 assert.equal((await f.call('/session','GET',undefined,staff)).status,401);
 assert.equal((await f.call('/login','POST',{username:'staff1',password:'Staff password 12345'})).status,401);
});
test('password resets revoke old sessions without exposing hashes',async()=>{
 const f=fixture(),owner=await f.login();let revision=(await f.call('/dishes','GET',undefined,owner)).data.revision;
 await f.call('/users','POST',{revision,username:'staff2',password:'Staff password 12345'},owner);const staff=await f.login('staff2','Staff password 12345');
 revision=(await f.call('/users','GET',undefined,owner)).data.revision;
 assert.equal((await f.call('/users/staff2','PATCH',{revision,changes:{password:'New staff password 456'}},owner)).status,200);
 assert.equal((await f.call('/session','GET',undefined,staff)).status,401);
 assert.equal((await f.call('/login','POST',{username:'staff2',password:'Staff password 12345'})).status,401);
 await f.login('staff2','New staff password 456');const users=await f.call('/users','GET',undefined,owner);assert(!JSON.stringify(users.data).includes('scrypt$'));
});
test('owner can add/archive dishes, update fees and hours; audit records changes',async()=>{
 const f=fixture(),s=await f.login();let revision=(await f.call('/dishes','GET',undefined,s)).data.revision;
 const dish={name:{ru:'Новое блюдо',kg:'',en:''},desc:{ru:'Описание',kg:'',en:''},category:'main',price:400,image:'https://example.test/photo.jpg'};
 const result=await f.call('/dishes','POST',{revision,dish},s);assert.equal(result.status,201);const id=result.data.dish.id;revision=result.data.revision;
 const archive=await f.call('/dishes/'+id,'PATCH',{revision,changes:{archived:true}},s);assert.equal(archive.status,200);
 assert(!(await f.call('/public')).data.dishes.some(d=>d.id===id));revision=archive.data.revision;
 const settings=await f.call('/settings','PATCH',{revision,changes:{order:{deliveryFees:{city:170,outside:220}},restaurant:{address:'Новый адрес'}}},s);assert.equal(settings.status,200);
 const current=(await f.call('/public')).data;assert.equal(current.order.deliveryFees.city,170);assert.equal(current.restaurant.address,'Новый адрес');assert((await f.call('/audit','GET',undefined,s)).data.audit.length>=3);
});
test('concurrent menu edits cannot silently overwrite each other',async()=>{
 const f=fixture(),s=await f.login();const revision=(await f.call('/dishes','GET',undefined,s)).data.revision;
 const results=await Promise.all([f.call('/dishes/1','PATCH',{revision,changes:{price:500}},s),f.call('/dishes/2','PATCH',{revision,changes:{price:600}},s)]);
 assert.deepEqual(results.map(r=>r.status).sort(),[200,409]);
});
test('malformed input and unsafe images are rejected, logout revokes access',async()=>{
 const f=fixture(),s=await f.login();const revision=(await f.call('/dishes','GET',undefined,s)).data.revision;
 assert.equal((await f.call('/dishes/1','PATCH',{revision,changes:{image:'javascript:alert(1)'}},s)).status,400);
 assert.equal((await f.call('/dishes/1','PATCH',null,s)).status,400);
 const result=await f.call('/logout','POST',{},s);assert.equal(result.status,200);assert.equal((await f.call('/session','GET',undefined,s)).status,401);
});
test('scrypt password verification matches and rejects wrong passwords',async()=>{assert(await verifyPassword(ownerPassword,ownerHash));assert(!await verifyPassword('wrong',ownerHash));});
