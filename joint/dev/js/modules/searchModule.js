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
		_footerShowListListener();
	};

	var _defaultRun = function () {
	};

	var _labelsListener = function () {
		var labels = document.querySelectorAll('.search__label');

		if (!labels) return;

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

	var _footerShowListListener = function () {
		var listLabels = document.querySelectorAll('.footer-search__item a');

		if (!listLabels) return false;

		Array.prototype.forEach.call(listLabels, function(label, index) {
			label.addEventListener('click', (function (ev) {
				ev.preventDefault();
				_showFooterOptionsList(index);
				console.log(index);
			}));
		});

		return true;
	};

	var _showFooterOptionsList = function (index) {
		var options = document.querySelector('.footer-search__options'),
				optionsLists = options.querySelectorAll('.footer-search__options-list');

		if (!options || !optionsLists) return false;

		Array.prototype.forEach.call(optionsLists, function(list, i) {
			if (i === index) {
				list.classList.add('footer-search__options-list--visible');
			}
			else {
				list.classList.remove('footer-search__options-list--visible');
			}
		});

		options.classList.add('footer-search__options--visible');

		return true;
	};

	return {
		init: init
	};

})();
