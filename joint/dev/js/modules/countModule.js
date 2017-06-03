var countModule = (function () {
	var init = function () {
		_setUpListeners();
		_defaultRun();
	};

	var _vars = {
		countFormClass : '.js--count-form',
		countResultClass : '.js--count-result'
	};

	var _setUpListeners = function () {
		_countListener();
	};

	var _defaultRun = function () {
	};

	var _countListener = function () {
		var countForm = document.querySelector(_vars.countFormClass);

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
					console.error('Ошибка в countModule._countListener: _countUpdate вернул false');
					return false;
				};
			});
		}

		else {
			console.info('Не работает модуль countModule: не найден ' + _vars.countFormClass);
			return false;
		};
	};

	var _countAction = function (sum, percent, time, first) {
		var result;

		result = (sum - sum * first / 100) * (percent / 100) / 12 / (1 - Math.pow((1 + percent / 100 / 12), ((-1) * time * 12) ));

		return Math.ceil(result);
	};

	var _countUpdate = function (result) {
		var updateObject = document.querySelector(_vars.countResultClass);

		if (updateObject) {
			updateObject.innerText = result + ' рублей';
			return true;
		}

		console.error('Ошибка в _countUpdate: не найден ' + _vars.countResultClass);
		return false;
	};

	return {
		init: init
	};

})();
