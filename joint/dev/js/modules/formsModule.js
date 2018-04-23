var formsModule = (function () {
	var init = function () {
		_setUpListeners();
		_defaultRun();
	};

	var _vars = {
		formsClass : '.js--form',
		inputClass : 'input',
		msgClass : 'textarea',
		inputNames : ['tel', 'email']
	};

	var TODO = {
		_formsListener : ['Замена текста на кнопке и её блокировка, пока не получен ответ от сервера', 'Использование массива для обхода полей без явного указания их названий']
	};

	var _setUpListeners = function () {
		_formsListener();
	};

	var _defaultRun = function () {
	};

	var _formsListener = function () {
		var forms = document.querySelectorAll(_vars.formsClass);

		Array.prototype.forEach.call(forms, function(form, index) {
			form.addEventListener('submit', function(e) {
				e.preventDefault();

				var inputs = form.querySelectorAll(_vars.inputClass),
						method = form.method,
						action = form.action,
						succMsg = form.dataset.msg,
						contact = false,
						email = false,
						info = false,
						msg = form.querySelector(_vars.msgClass) || false,
						json;

				if (!method || !action) {
					console.error('Ошибка в formsModule._formsBindSubmit: у формы ' + form + ' наличие method: ' + method + ' наличие action: ' + action);
					return false;
				};

				Array.prototype.forEach.call(inputs, function(input, index) {

					if (input.name === 'contact') {
						contact = input.value;
					};

					if (input.name === 'email') {
						email = input.value;
					};

					if (input.name === 'info') {
						info = input.value;
					};
				});

				if (msg) msg = msg.value;

				if (!contact && !email) {
					console.error('Ошибка в formsModule._formsBindSubmit: у формы ' + form + ' не заполнены контактные данные.');
					popupModule.showError('Пожалуйста, введите ваши контактные данные!');
					return false;
				};

				if (!contact) contact = 'Не заполнено';
				if (!email) email = 'Не заполнено';
				if (!msg) msg = 'Не заполнено';
				if (!info) info = 'Не заполнено';

				json = {
					contact: contact,
					email: email,
					info: info,
					msg: msg
				};

				console.log(json, method, action, succMsg)
				_sendAction(json, method, action, succMsg);

				return true;
			});
		});
	};

	var _sendAction = function (json, method, action, succMsg) {
		var xhr = new XMLHttpRequest();

		xhr.open(method, action);
		xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xhr.send(JSON.stringify(json));

		xhr.onreadystatechange = function() {
			if (xhr.readyState != 4) {
				console.error('Ошибка в formsModule._sendAction: статус xhr запроса не 4.');
			};

			if (xhr.status != 200) {
				console.error('Ошибка в formsModule._sendAction: ответ сервера: ' + xhr.status + ' ' + xhr.statusText);
				popupModule.showError('Что-то пошло не так. Пока мы решаем проблему, позвоните нам!');
				return false;
			}

			else {
				console.info('Ответ сервера в formsModule._sendAction: ' + xhr.responseText);
				popupModule.showSuccess(succMsg);
				return true;
			};
		};
	};

	return {
		init: init
	};

})();
