# -*- coding: utf-8 -*-

from flask import render_template, request, redirect, url_for, jsonify

from joint import joint

from flask.ext.mail import Mail, Message

import requests

mail = Mail(joint)
TELEGRAM_BOT = '308685946:AAGNdvvx0WMeClCMQS9W7jhCWmaoh2pwpLw'
TELEGRAM_CHAT = '140008955'

@joint.route('/')
def index():
		return render_template('index.html')

@joint.route('/object/list')
def object_list():
		return render_template('object-list.html')

@joint.route('/object')
def object():
		return render_template('object.html')

@joint.route('/ipoteka')
def ipoteka():
		return render_template('ipoteka.html')

@joint.route('/uslugi')
def services():
		return render_template('services.html')

@joint.route('/presents')
def presents():
		return render_template('presents.html')

# Эту используем
@joint.route('/order', methods=['POST'])
def order():
		data = request.get_json()
		phone = str(data['phone'])

		if 'type' in data.keys():
				formType = str(data['type'])
		else:
				formType = '<small>поле не заполнено</small>'

		if (phone and phone != ""):
				import datetime

				sendTelegram(str(phone), str(formType))

				msg = Message('Оформлен заказ',
											sender='info@iswash.ru',
											recipients=['zakaz@iswash.ru'],
											bcc=['doyoulikeorigami@gmail.com'],
											charset='utf-8')
				msg.body = "phone: " + str(phone)
				msg.html = "<h3>Оформлен заказ с сайта isWash.ru</h3>" \
									 "<b>Телефон:</b> " + str(phone) + \
									 "<br><b>Форма:</b> " + str(formType) + \
									 "<br><small>Время отправки: " + \
									 str(datetime.datetime.now().ctime()) + "</small>"
				mail.send(msg)
				return 'Ok'

		return 402


@joint.route('/callback', methods=['POST'])
def callback():
		name = str(request.form.get('name').encode('utf-8')) \
				if str(request.form.get('name').encode('utf-8')) \
				else '<small>поле не заполнено</small>'
		phone = str(request.form.get('phone').encode('utf-8'))

		if phone:
				import datetime

				msg = Message('Обратный звонок',
											sender='info@iswash.ru',
											recipients=['info@iswash.ru'],
											bcc=['info+iswash@jokerinteractive.ru'],
											charset='utf-8')
				msg.body = "phone: " + str(phone)
				msg.html = "<h3>Оформлен обратный звонок с сайта isWash.ru</h3>" \
									 "<b>Телефон:</b> " + str(phone) + \
									 "<br><b>от:</b> " + str(name) + \
									 "<br><small>Время отправки: " + \
									 str(datetime.datetime.now().ctime()) + "</small>"
				# print(msg)
				mail.send(msg)
				return redirect(url_for('index'))

		return 'Ошибка'


def sendTelegram(tel, formType):
	r = requests.get('https://api.telegram.org/bot' + TELEGRAM_BOT + '/sendMessage?chat_id=' + TELEGRAM_CHAT + '&text=' + tel + ' ' + formType)
	#print(r.text)
	#print(r.status_code)
	#print(r.headers['content-type'])
	return 200


@joint.route('/getUpd', methods=['GET'])
def getUpd():
	m = requests.get('https://api.telegram.org/bot308685946:AAGNdvvx0WMeClCMQS9W7jhCWmaoh2pwpLw/getUpdates')
	print(m.text)
	#print(m.status_code)
	#print(m.headers['content-type'])
	return redirect(url_for('index'))
