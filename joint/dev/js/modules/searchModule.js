var searchModule = (function () {
	var init = function () {
		_setUpListeners();
		_defaultRun();
	};

	var _vars = {
		key : 'value'
	};

	var _setUpListeners = function () {
		_labelsListener();
	};

	var _defaultRun = function () {
	};

	var _labelsListener = function () {
		var labels = document.querySelectorAll('.search__label');

		Array.prototype.forEach.call(labels, function(label) {
			label.addEventListener('click', (function (ev) {
				ev.preventDefault();
				label.classList.toggle('search__label--active');

				var input = label.querySelector('input');

				if (input.checked) {
					input.checked = false;
				}
				else {
					input.checked = true;
				};
			}));
		});
	};

	return {
		init: init
	};

})();
