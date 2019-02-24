window.onload = function () {

	slider_show('.gallery-1');

	new SliderShow({
		images: ".gallery-2 img",
		btnPrev: ".gallery-2 .buttons .prev",
		btnNext: ".gallery-2 .buttons .next",
		auto: true,
		rate: 3000
	});

}

/*------------------- Slider show без ООП ----------------------------------*/

function slider_show(elem) {
	var images = document.querySelectorAll(elem + ' img'),
		auto = 'auto',
		btnPrev = document.querySelector(elem + ' #prev'),
		btnNext = document.querySelector(elem + ' #next'),
		rate = 4000,
		i = 0,
		prev = function () {
			images[i].classList.remove('showed');
			i--;

			if (i < 0) {
				i = images.length - 1;
			}

			images[i].classList.add('showed');
		},
		next = function () {
			images[i].classList.remove('showed');
			i++;

			if (i >= images.length) {
				i = 0;
			}

			images[i].classList.add('showed');
		}

	btnPrev.onclick = prev;
	btnNext.onclick = next;

	if (auto) {
		setInterval(next, rate);
	}
}

/*---------Slider JS show ООП---------------*/
function SliderShow(obj) {

	this.images = document.querySelectorAll(obj.images) || document.querySelectorAll('.gallery-2 img');
	this.imagesWrap = this.images[0].parentElement;

	this.auto = obj.auto || 'auto';

	this.btnPrev = document.querySelector(obj.btnPrev) || document.querySelector('.gallery-2 #prev');
	this.btnNext = document.querySelector(obj.btnNext) || document.querySelector('.gallery-2 #next');

	this.pagination = obj.pagination || true;
	this.paginationWrap = obj.paginationWrap || 'pagination';
	this.paginationItem = obj.paginationItem || 'pagination_item';

	this.rate = obj.rate || 1000;

	var i = 0,
		direction = 1,
		isRun = false,
		slider = this;

	this.move = function (direction) {
		if (isRun) {
			return;
		}
		isRun = true;
		slider.images[i].classList.remove('showed');
		document.querySelectorAll('.' + slider.paginationItem)[i].classList.remove('active');
		i += direction;
		if (i < 0) {
			i = slider.images.length - 1;
		}
		if (i >= slider.images.length) {
			i = 0;
		}
		slider.images[i].classList.add('showed');
		document.querySelectorAll('.' + slider.paginationItem)[i].classList.add('active');
		setTimeout(function () {
			isRun = false;
		}, slider.rate);
	}

	slider.btnPrev.addEventListener('click', function (e) {
		e.preventDefault();
		direction = -1;
		slider.move(-1);
		//return isRun = false;
	});
	slider.btnNext.addEventListener('click', function (e) {
		e.preventDefault();
		direction = 1;
		slider.move(1);
		//return isRun = false;
	});
	if (slider.auto) {
		//setInterval(slider.move(1), slider.rate);
		var timerRun, runs, timer_is_on = 0;
		startTimer();



		slider.imagesWrap.addEventListener('mouseover', function (e) {
			stopTimer();

		});

		slider.btnPrev.addEventListener('mouseover', function (e) {
			stopTimer();
		});

		slider.btnNext.addEventListener('mouseover', function (e) {
			stopTimer();
		});

		slider.imagesWrap.addEventListener('mouseout', function (e) {
			startTimer();
		});


		function timedMoving() {
			// timerRun = setTimeout(function run() {
			// 	slider.move(direction);

			// 	var runs = setTimeout(run, slider.rate);
			// }, slider.rate);
			timerRun = setInterval(function () {
				slider.move(direction);
			}, slider.rate);
		}

		function startTimer() {
			//if (!timer_is_on) {
			//timer_is_on = 1;
			timedMoving();
			//}
		}

		function stopTimer() {
			clearInterval(timerRun);
			//clearTimeout(runs);
			//timer_is_on = 0;
		}


	}

	if (slider.pagination) {
		var pagination = document.createElement('ul');
		pagination.classList.add(slider.paginationWrap);
		slider.imagesWrap.parentElement.insertBefore(pagination, slider.imagesWrap);
		var paginationArr = [];
		for (var k = 0; k < slider.images.length; k++) {
			var pagination_item = '<li class="' + slider.paginationItem + '" data-item="' + k + '"></li>';
			paginationArr.push(pagination_item);
		}
		pagination.innerHTML = paginationArr.join('');
		pagination.firstChild.classList.add('active');

		setTimeout(function () {


			var pagination_items = document.querySelectorAll('.' + slider.paginationItem);
			var pagination_wrap = document.querySelector('.' + slider.paginationWrap);
			
			

			for (var l = 0; l < pagination_items.length; l++) {

				pagination_items[l].addEventListener('click', function (e) {
					e.preventDefault();
					var $this = this;

					// console.log($this.getAttribute('class'));
					var count = +$this.getAttribute('data-item');
					i = count;

					$this.classList.add('active');
					for (var m = 0; m < slider.images.length; m++) {
						if (count != m) {
							slider.images[m].classList.remove('showed');
							pagination_items[m].classList.remove('active');
						} else {
							slider.images[m].classList.add('showed');
						}
					}
				});
			}

			pagination_wrap.addEventListener('mouseover', function (e) {
				stopTimer();

			});

		}, 500);
	}
}