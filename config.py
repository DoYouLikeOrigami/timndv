# -*- coding: utf-8 -*-
import os.path as op

CSRF_ENABLED = True
SECRET_KEY = 'superSecret)'

SQLALCHEMY_DATABASE_URI = 'sqlite:///joint.sqlite'
SQLALCHEMY_ECHO = True

#MAIL_SERVER = 'smtp.yandex.ru'
#MAIL_PORT = 465
#MAIL_USE_SSL = True
#MAIL_USERNAME = 'no-reply@jokerinteractive.ru'
#MAIL_PASSWORD = '12345678'

MAIL_SERVER = 'smtp.mail.ru'
MAIL_PORT = 465
MAIL_USE_SSL = True
MAIL_USERNAME = 'info@iswash.ru'
MAIL_PASSWORD = '@n7q8ZLsZpUg'

UPLOAD_PATH = op.join(op.dirname(__file__), 'joint/static')
