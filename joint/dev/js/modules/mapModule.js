'use strict';

var mapModule = (function () {
	var init = function () {
		_setUpListeners();
		_defaultRun();
	};

	var _vars = {
		key : 'value'
	};

	var _setUpListeners = function () {
	};

	var _defaultRun = function () {
		if (ymaps) {
			ymaps.ready(_initMap);
			ymaps.ready(_initBigMap);
		};
	};

	var _initMap = function () {

		if (!document.querySelector('.object-img__map')) {
			return false;
		};

		var container = document.querySelector('.object-img__map'),
				mapId = container.id,
				coords = _getObjectLocation(container),
				hint = _getHint(container),
				map = new ymaps.Map(mapId, {
          center: [coords[0], coords[1]],
          zoom: 10
        }),
        placemark = new ymaps.Placemark([coords[0], coords[1]], {
        	hintContent: hint
        });

        map.geoObjects.add(placemark);
        map.behaviors.disable('scrollZoom');

    return true;
	};

	var _initBigMap = function () {

		if (!document.querySelector('.search__map')) {
			return false;
		};

		var container = document.querySelector('.search__map'),
				mapId = container.id,
				coords = _getObjectLocation(container),
				coordsX = coords[0].split(';'),
				coordsY = coords[1].split(';'),
				hints = _getHint(container).split(';'),
				links = container.dataset.links.split(';'),
				placemarks = new Array(coordsX.length),
				map = new ymaps.Map(mapId, {
          center: [59.91817154, 30.30557800],
          zoom: 10
        });

    for (var i = 0; i < placemarks.length; i++) {
    	placemarks[i] = 0;
    };

    var myCollection = new ymaps.GeoObjectCollection({}, {});

    Array.prototype.forEach.call(placemarks, function(placemark, i) {

    	placemark = new ymaps.Placemark([coordsX[i], coordsY[i]], {
     		hintContent: hints[i]
     	});

     	placemark.events.add('click', function () {
    		location.assign("/object/" + links[i]);
			});

			myCollection.add(placemark);
    });

    map.geoObjects.add(myCollection);

    return true;
	};

	var _getObjectLocation = function (container) {
		if (!container) return false;

		var coords = [];

		coords.push(container.dataset.x);
		coords.push(container.dataset.y);

		return coords;
	};

	var _getHint = function (container) {
		if (!container) return false;

		var hint = container.dataset.hint;

		return hint;
	};

	return {
		init: init
	};

})();
