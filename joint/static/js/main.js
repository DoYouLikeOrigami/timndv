'use strict';

var mainModule = (function () {

	var init = function () {
		_setUpListeners();
		_defaultRun();
	};

	var _setUpListeners = function () {
		_countListener();
	};

	var _vars = {
		popups : ['order', 'call', 'register-seminar', 'action', 'question', 'order-get', 'partners', 'consult', 'buy', 'plans']
	};

	var _defaultRun = function () {
		_popupsBindClose();
		_popupsBindOpen();
	};

	var _showPopup = function (popup) {
		// Если открыт другой попап, то сначала его прячем,
		// а потом показываем этот, чтобы не было багов
		if (_hidePopup()) {
			if (!popup) {
				return false
			};

			var overlay = document.querySelector('.overlay');

			popup.classList.add('popup--active');
			if (overlay) overlay.classList.add('overlay--active');

			return true;
		};
	};

	// returns true
	// if no popup searches for active and closes it
	var _hidePopup = function (popup) {
		if (!popup) {
			popup = document.querySelector('.popup--active');
		}

		var overlay = document.querySelector('.overlay');

		if (popup) popup.classList.remove('popup--active');
		if (overlay) overlay.classList.remove('overlay--active');

		return true;
	};

	var _popupsBindClose = function () {
		var popups = document.querySelectorAll('.popup'),
				overlay = document.querySelector('.overlay');

		// Событие скрытия попапов при нажатии на кнопку .js--close-popup
		if (popups) {
			Array.prototype.forEach.call(popups, function(popup, index) {
				var hideBtns = popup.querySelectorAll('.js--close-popup');

				Array.prototype.forEach.call(hideBtns, function(hideBtn, index) {
					hideBtn.addEventListener('click', function(e) {
						e.preventDefault();
						_hidePopup(popup);
					});
				});
			});
		};


		// Событие скрытия попапов при нажатии на overlay
		if (overlay) {
			overlay.addEventListener('click', function(e) {
				e.preventDefault();
				_hidePopup();
			});
		};
	};

	var _bindPopup = function (mod) {
		var btns = document.querySelectorAll('.js--show-' + mod +'-popup'),
				popup = document.querySelector('.popup--js-' + mod);

		Array.prototype.forEach.call(btns, function(btn, index) {
			btn.addEventListener('click', function(e) {
				e.preventDefault();

				_showPopup(popup);
			});
		});
	};

	var _popupsBindOpen = function () {

		for (var number in _vars.popups) {
			if (document.querySelector('.popup--js-' + _vars.popups[number])) {
				_bindPopup(_vars.popups[number]);
			};
		};
	};



	// calc functions
	var _countListener = function () {
		var countForm = document.querySelector('.js--count-form');

		if (countForm) {
			countForm.addEventListener('submit', function (e) {
				e.preventDefault();

				var form = this,
				    sum = parseInt(this.querySelector('input[name="sum"]').value),
				    percent = parseInt(this.querySelector('input[name="percent"]').value),
				    time = parseInt(this.querySelector('input[name="time"]').value),
				    first = parseInt(this.querySelector('input[name="first"]').value),
				    result = _countAction(sum, percent, time, first);

				if (_countUpdate(result)) {
					return true;
				}
				else {
					console.error('Ошибка в _countListener: _countUpdate вернул false');
					return false;
				};
			});
		}

		else {
			console.info('Не работает модуль _countListener: не найден .js--count-form');
			return false;
		};
	};

	var _countAction = function (sum, percent, time, first) {
		var result;

		result = (sum - sum * first / 100) / time * percent / 100;

		return result;
	};

	var _countUpdate = function (result) {
		var updateObject = document.querySelector('.js--count-result');

		if (updateObject) {
			updateObject.innerText = result + ' рублей';
			return true;
		}

		console.error('Ошибка в _countUpdate: не найден .js--count-result');
		return false;
	};

	return {
		init: init
	};

})();

mainModule.init();
