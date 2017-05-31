var mainModule = (function () {

	var init = function () {
		_setUpListeners();
		_defaultRun();
	};

	var _setUpListeners = function () {
	};

	var _vars = {
	};

	var _defaultRun = function () {
		popupModule.init();
		countModule.init();
		formsModule.init();
	};

	return {
		init: init
	};

})();
