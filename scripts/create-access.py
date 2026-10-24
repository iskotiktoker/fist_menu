#!/usr/bin/env python3
"""Create a private Netlify import file. Passwords are entered locally and never saved."""
import getpass
import hashlib
import os
from pathlib import Path
import re
import secrets

def password_hash(password):
    salt = secrets.token_hex(16)
    key = hashlib.scrypt(password.encode(), salt=salt.encode(), n=32768, r=8, p=3, maxmem=64*1024*1024, dklen=64)
    return 'scrypt$32768$8$3$' + salt + '$' + key.hex()

def ask_account(role):
    username = input(f'Email или логин {role}: ').strip().lower()
    if not re.fullmatch(r'(?:[a-z0-9_-]{3,40}|[a-z0-9._%+-]{1,64}@[a-z0-9.-]+\.[a-z]{2,63})', username):
        raise SystemExit('Проверьте email или логин.')
    password = getpass.getpass(f'Пароль {role} (от 8 символов): ')
    if not 8 <= len(password) <= 128 or password != getpass.getpass('Повторите пароль: '):
        raise SystemExit('Пароли должны совпадать и содержать 8–128 символов.')
    return username, password_hash(password)

if __name__ == '__main__':
    owner, owner_hash = ask_account('владельца')
    admin, admin_hash = ask_account('администратора')
    if owner == admin:
        raise SystemExit('У владельца и администратора должны быть разные логины.')
    target = Path('.env.netlify-access')
    content = f"OWNER_LOGIN={owner}\nOWNER_PASSWORD_HASH='{owner_hash}'\nINITIAL_ADMIN_LOGIN={admin}\nINITIAL_ADMIN_PASSWORD_HASH='{admin_hash}'\n"
    fd = os.open(target, os.O_WRONLY | os.O_CREAT | os.O_TRUNC, 0o600)
    with os.fdopen(fd, 'w') as stream:
        stream.write(content)
    os.chmod(target, 0o600)
    print('Создан приватный файл .env.netlify-access для импорта в Netlify. Пароли не сохранены.')
    print('В Netlify импортируйте переменные в Functions и выполните новый deploy. Не добавляйте этот файл в GitHub.')
