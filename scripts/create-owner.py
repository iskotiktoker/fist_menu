#!/usr/bin/env python3
"""Generate an owner password hash locally; never write or print the password."""
import getpass
import hashlib
import secrets
password = getpass.getpass('Придумайте пароль владельца (от 12 символов): ')
confirmation = getpass.getpass('Повторите пароль: ')
if password != confirmation:
    raise SystemExit('Пароли не совпали.')
if not 12 <= len(password) <= 128:
    raise SystemExit('Пароль должен содержать 12–128 символов.')
salt = secrets.token_hex(16)
key = hashlib.scrypt(password.encode(), salt=salt.encode(), n=32768, r=8, p=3, maxmem=64*1024*1024, dklen=64)
print('\nДобавьте в переменные окружения Netlify (scope Functions):')
print('OWNER_LOGIN = founder')
print('OWNER_PASSWORD_HASH = scrypt$32768$8$3$' + salt + '$' + key.hex())
print('\nСохраните пароль в менеджере паролей. Не добавляйте хеш и пароль в GitHub.')
