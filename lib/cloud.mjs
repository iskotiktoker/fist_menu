import { getStore } from '@netlify/blobs';
import seed from './menu-seed.json' with { type: 'json' };
import { createService } from './service.mjs';
export async function cloudHandler(request){
  const store=getStore({name:'altyn-restaurant-v1',consistency:'strong'});
  return createService({store,seed,env:process.env})(request);
}
