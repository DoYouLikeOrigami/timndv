var mainModule = (function () {

	var init = function () {
		_setUpListeners();
		_defaultRun();
	};

	var _setUpListeners = function () {
		window.addEventListener('scroll', _toggleTopper);
	};

	var _vars = {
	};

	var _defaultRun = function () {
		popupModule.init();
		countModule.init();
		//formsModule.init();
		sliderModule.init();
		searchModule.init();
		tabsModule.init();
		mapModule.init();
	};

	var _toggleTopper = function () {
		var scrolled = window.pageYOffset || document.documentElement.scrollTop,
				topper = document.querySelector('.topper');

		if (scrolled >= 60) {
			topper.classList.add('topper--visible');
		}
		else {
			topper.classList.remove('topper--visible');
		};
	};

	return {
		init: init
	};

})();
