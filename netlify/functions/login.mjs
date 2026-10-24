import { cloudHandler } from '../../lib/cloud.mjs';
export default function handler(request){
  if(!['/api/login','/.netlify/functions/login'].includes(new URL(request.url).pathname))return new Response(null,{status:404});
  return cloudHandler(request);
}
export const config={path:'/api/login',rateLimit:{windowLimit:8,windowSize:60,aggregateBy:['ip','domain']}};
