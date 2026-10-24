import { randomBytes, createHash, scrypt as derive, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
const scrypt = promisify(derive);
export const randomToken = () => randomBytes(32).toString('base64url');
export const digest = text => createHash('sha256').update(text).digest('hex');
export async function passwordHash(password) {
  const salt = randomBytes(16).toString('hex');
  const key = await scrypt(password, salt, 64, { N:32768, r:8, p:3, maxmem:64*1024*1024 });
  return `scrypt$32768$8$3$${salt}$${key.toString('hex')}`;
}
export function validHash(hash) { return /^scrypt\$32768\$8\$3\$[a-f0-9]{32}\$[a-f0-9]{128}$/.test(hash || ''); }
export async function verifyPassword(password, hash) {
  if (!validHash(hash)) return false;
  const parts = hash.split('$');
  const key = await scrypt(password, parts[4], 64, { N:32768, r:8, p:3, maxmem:64*1024*1024 });
  return timingSafeEqual(key, Buffer.from(parts[5], 'hex'));
}
