import { cloudHandler } from '../../lib/cloud.mjs';
export default function handler(request){
  // Authentication is handled only by the separately rate-limited login function.
  if(new URL(request.url).pathname.endsWith('/login'))return new Response(null,{status:404});
  return cloudHandler(request);
}
export const config={path:['/api/public','/api/session','/api/logout','/api/dishes','/api/dishes/*','/api/settings','/api/users','/api/users/*','/api/audit'],rateLimit:{windowLimit:100,windowSize:60,aggregateBy:['ip','domain']}};
