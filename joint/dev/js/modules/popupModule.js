var popupModule = (function () {
	var init = function () {
		_setUpListeners();
		_defaultRun();
	};

	var _vars = {
		popups : ['order', 'call', 'register-seminar', 'action', 'question', 'order-get', 'partners', 'consult', 'buy', 'plans'],
		successPopupClass : '.popup--js-success',
		errorPopupClass : '.popup--js-error',
		popupTextClass : '.popup__text'
	};

	var _setUpListeners = function () {
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

	var showError = function (text) {
		var errPopup = document.querySelector(_vars.errorPopupClass),
		    errPopupText = errPopup.querySelector(_vars.popupTextClass);

		if (!text) text = "Что-то пошло не так. Попробуйте снова!";

		errPopupText.innerText = text;

		return _showPopup(errPopup);
	};

	var showSuccess = function (text) {
		var succPopup = document.querySelector(_vars.successPopupClass),
		    succPopupText = succPopup.querySelector(_vars.popupTextClass);

		if (!text) text = "Всё получилось!";

		succPopupText.innerText = text;

		return _showPopup(succPopup);
	};

	return {
		init: init,
		showError: showError,
		showSuccess: showSuccess
	};

})();
