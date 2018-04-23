var sliderModule = (function () {
	var init = function () {
		_setUpListeners();
		_defaultRun();
	};

	var _vars = {
		key : 'value'
	};

	var TODO = {
	};

	var _setUpListeners = function () {
	};

	var _defaultRun = function () {
		if (document.querySelector('.news')) _bindSlider('news', 'news__item', 'news__article');
		if (document.querySelector('.reviews')) _bindSlider('reviews', 'reviews__btn', 'reviews__item');
		if (document.querySelector('.object-plans')) {
			_bindSlider('object-plans', 'object-plans__tabs-item', 'object-plans__block');
			_bindSlider('object-plans', 'object-plans__tabs-item', 'object-plans__plans-content');
		};
		if (document.querySelector('.object-img')) _objectImgSwiper();
		if (document.querySelector('.object-img__slider')) _objectChangeImg();
		if (document.querySelector('.search')) _searchSlider();
	};

	var _bindSlider = function (blockName, navName, itemsName) {

		var blockSections = document.querySelectorAll('.' + blockName);

		Array.prototype.forEach.call(blockSections, function(blockSection) {
			var navItems = blockSection.querySelectorAll('.' + navName),
			    sliderItems = blockSection.querySelectorAll('.' + itemsName);

			Array.prototype.forEach.call(navItems, function(navItem, index) {
				navItem.addEventListener('click', (function (ev) {
					ev.preventDefault();

					_activateByNumber(index, navItems, navName, sliderItems, itemsName);
				}));
			});
		});
	};

	var _activateByNumber = function (number, navItems, navName, sliderItems, itemsName) {
		for (var i = 0; i < navItems.length; i++) {
			if (i === number) {
				navItems[i].classList.add(navName + '--active');
				sliderItems[i].classList.add(itemsName + '--active');
			}
			else {
				navItems[i].classList.remove(navName + '--active');
				sliderItems[i].classList.remove(itemsName + '--active');
			};
		};
	};

	var _objectImgSwiper = function () {
		var objectImgSwiper = new Swiper('.object-img .swiper-container', {
        slidesPerView: 3,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 0,
        breakpoints: {
    			480: {
      			slidesPerView: 2,
      			spaceBetween: 20
    			}
    		}
    });
	};

	var _objectChangeImg = function () {
		var slider = document.querySelector('.object-img__slider'),
		    mainImg = slider.querySelector('.object-img__slider-current img'),
		    sliderItems = slider.querySelectorAll('.object-img__slider-item');

		Array.prototype.forEach.call(sliderItems, function(sliderItem) {
			sliderItem.addEventListener('click', (function (ev) {
				ev.preventDefault();

				var imgSrc = sliderItem.querySelector('img').src;
				mainImg.src = imgSrc;
			}));
		});
	};

	var _searchSlider = function () {
		var searchBlocks = document.querySelectorAll('.search__content');

		Array.prototype.forEach.call(searchBlocks, function(searchBlock) {
		  var stepNumberBlock = searchBlock.querySelector('.search__step-curr'),
		      stepNumber = 0,
		      searchSlides = searchBlock.querySelectorAll('.search__block'),
		      nextBtns = searchBlock.querySelectorAll('.js--next-btn'),
		      prevBtns = searchBlock.querySelectorAll('.js--prev-btn');

			Array.prototype.forEach.call(nextBtns, function(nextBtn) {
				nextBtn.addEventListener('click', (function (ev) {
					ev.preventDefault();

					if (searchSlides[stepNumber] && searchSlides[stepNumber + 1]) {
						searchSlides[stepNumber].classList.remove('search__block--active');
						searchSlides[stepNumber].classList.add('search__block--visited');
					};

					if (searchSlides[stepNumber + 1]) {
						searchSlides[stepNumber + 1].classList.add('search__block--active');
						stepNumberBlock.innerText = stepNumber + 2;
						stepNumber++;
					};
				}));
			});

			Array.prototype.forEach.call(prevBtns, function(prevBtn) {
				prevBtn.addEventListener('click', (function (ev) {
					ev.preventDefault();

					if (searchSlides[stepNumber] && searchSlides[stepNumber - 1]) {
						searchSlides[stepNumber].classList.remove('search__block--active');
					};

					if (searchSlides[stepNumber - 1]) {
						searchSlides[stepNumber - 1].classList.add('search__block--active');
						searchSlides[stepNumber - 1].classList.remove('search__block--visited');
						stepNumberBlock.innerText = stepNumber;
						stepNumber--;
					};
				}));
			});
		});
	};

	return {
		init: init
	};

})();
