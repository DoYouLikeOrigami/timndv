var tabsModule = (function () {
	var init = function () {
		_setUpListeners();
		_defaultRun();
	};

	var _vars = {
		key : 'value'
	};

	var _setUpListeners = function () {
		if (document.querySelector('.object-plans__info-btn')) _showPlansInfo();
		if (document.querySelector('.object-plans__plans')) _togglePlansSlider();
		if (document.querySelector('.js--show-decription')) _showAllText();
	};

	var _defaultRun = function () {
	};

	var _showPlansInfo = function () {
		var buttons = document.querySelectorAll('.js--show-plans-info');

		Array.prototype.forEach.call(buttons, function(button, index) {
			var parentBlock = button.parentElement.parentElement,
					infoLists = parentBlock.querySelectorAll('.object-plans__block-list'),
					activeClassName = 'object-plans__block-list--active';

			button.addEventListener('click', function (ev) {
				ev.preventDefault();

				Array.prototype.forEach.call(infoLists, function(infoList, index) {
					if (infoList.classList.contains(activeClassName)) {
						infoList.classList.remove(activeClassName);
						button.innerText = 'Показать информацию';
					}

					else {
						infoList.classList.add(activeClassName);
						button.innerText = 'Скрыть информацию';
					};
				});
			});
		});
	};

	var _showAllText = function () {
		var block = document.querySelector('.object-description'),
				textBlock = block.querySelector('.object-description__text'),
				btn = block.querySelector('.js--show-decription'),
				activeClassName = 'object-description__text--shown';

		btn.addEventListener('click', function (ev) {
			ev.preventDefault();

			if (textBlock.classList.contains(activeClassName)) {
				textBlock.classList.remove(activeClassName);
				btn.innerText = 'Показать полное описание';
			}
			else {
				textBlock.classList.add(activeClassName);
				btn.innerText = 'Скрыть полное описание';
			};

		});
	};

	var _togglePlansSlider = function () {
		var sliderBlocks = document.querySelectorAll('.object-plans__plans-content');

		Array.prototype.forEach.call(sliderBlocks, function(sliderBlock, index) {
			var btnFloor = sliderBlock.querySelector('.js--show-floor'),
					btnRoom = sliderBlock.querySelector('.js--show-room'),
					sliderFloor = sliderBlock.querySelector('.js--floor-slider'),
					sliderRoom = sliderBlock.querySelector('.js--room-slider');

			btnFloor.addEventListener('click', function (ev) {
				ev.preventDefault();

				btnFloor.classList.add('object-plans__plans-btns-item--active');
				btnRoom.classList.remove('object-plans__plans-btns-item--active');

				sliderFloor.classList.add('object-plans__plans-slider--active');
				sliderRoom.classList.remove('object-plans__plans-slider--active');
			});

			btnRoom.addEventListener('click', function (ev) {
				ev.preventDefault();

				btnRoom.classList.add('object-plans__plans-btns-item--active');
				btnFloor.classList.remove('object-plans__plans-btns-item--active');

				sliderRoom.classList.add('object-plans__plans-slider--active');
				sliderFloor.classList.remove('object-plans__plans-slider--active');
			});
		});
	};

	return {
		init: init
	};

})();
