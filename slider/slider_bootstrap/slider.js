window.onload = function () {
	new SliderShow({
		images: ".gallery-1 img",
		btnPrev: ".gallery-1 .buttons .prev",
		btnNext: ".gallery-1 .buttons .next",
		auto: true,
		rate: 3000
	});

	new Slider({
		images: '.gallery-2 img',
		btnPrev: '.gallery-2 .buttons .prev',
		btnNext: '.gallery-2 .buttons .next',
		auto: true,
		rate: 2000
	});

}


/*
/*---------Slider JS без движения ООП---------------*/
function SliderShow(obj) {
	this.images = document.querySelectorAll(obj.images);

	this.auto = obj.auto;

	this.btnPrev = obj.btnPrev;
	this.btnNext = obj.btnNext;

	this.rate = obj.rate || 1000;

	var i = 0;

	var slider = this;

	this.prev = function () {
		slider.images[i].classList.remove('showed');
		i--;

		if (i < 0) {
			i = slider.images.length - 1;
		}

		slider.images[i].classList.add('showed');
	}

	this.next = function () {
		slider.images[i].classList.remove('showed');
		i++;

		if (i >= slider.images.length) {
			i = 0;
		}

		slider.images[i].classList.add('showed');
	}

	document.querySelector(slider.btnPrev).onclick = slider.prev;
	document.querySelector(slider.btnNext).onclick = slider.next;

	if (slider.auto) {
		setInterval(slider.next, slider.rate);
	}
}

/*----------------Slider JQUERY движение ООП--------------------------*/

function Slider(obj) {

	this.images = $(obj.images);
	this.auto = obj.auto;
	this.wrap = this.images.parent();
	this.container = this.wrap.parent();
	this.btnPrev = $(obj.btnPrev);
	this.btnNext = $(obj.btnNext);
	this.rate = obj.rate || 1000;

	var i = 0,
		slider = this,
		left = 0,
		top = 0;
	this.move = function (direction) {

		i += direction;



		left = slider.images.width() * i + 'px';

		slider.wrap.delay(1000).css({
			transform: "translate(-" + left + ")",
			transition: "1.5s"
		});

		if (i >= slider.images.length) {
			i = 0;
		}

		if (i < 0) {
			i = slider.images.length - 1;
		}

	};
	this.prev = function () {
		slider.move(1);
	};

	this.next = function () {
		slider.move(-1);
	};

	slider.btnPrev.on("click", function (e) {
		e.preventDefault();
		slider.move(1);
	});
	slider.btnNext.on("click", function (e) {
		e.preventDefault();
		slider.move(-1);
	});

	if (slider.auto) {
		var moving = setInterval(slider.next, slider.rate);
		slider.container.on('mouseover', function () {
			clearInterval(moving);
			console.log('mouseover');
		});

		slider.container.on('mouseout', function () {
			moving = setInterval(slider.next, slider.rate);
			console.log('mouseout');
		});


	}
};

/*--------------Slider JQUERY анимации ООП---------------------*/

function SliderAnim(obj) {

	this.images = $(obj.images);
	this.auto = obj.auto;
	this.btnPrev = $(obj.btnPrev);
	this.btnNext = $(obj.btnNext);
	this.rate = obj.rate || 1000;

	var i = 0;

	var slider = this;
	sliderWidth = slider.images.eq(0).width();
	sliderHeight = slider.images.eq(0).height();

	var isRun = false;

	this.prev = function () {


		if (isRun) {
			return;
		}

		isRun = true;

		slider.images.eq(i)
			.css({
				left: 0,
				top: 0,
				right: 'auto',
				bottom: 'auto'
			})
			.animate({
				width: 0,
			}, 500);

		i--;

		if (i < 0) {
			i = slider.images.length - 1;
		}


		slider.images.eq(i)
			.css({
				left: 'auto',
				top: 'auto',
				right: 0,
				bottom: 0
			})
			.animate({
				width: '100%'
			}, 500, function () {
				isRun = false;
			});

	}
	this.next = function () {


		if (isRun) {
			return;
		}

		isRun = true;

		slider.images.eq(i)
			.css({
				left: 'auto',
				top: 'auto',
				right: 0,
				bottom: 0
			})
			.animate({
				width: '0'
			}, 500);



		i--;

		if (i < 0) {
			i = slider.images.length - 1;
		}


		slider.images.eq(i)
			.css({
				left: 0,
				top: 0,
				right: 'auto',
				bottom: 'auto'
			})
			.animate({
				width: '100%'
			}, 500, function () {
				isRun = false;
			});

	}


	$(slider.btnPrev).on('click', function (e) {
		e.preventDefault();
		console.log(1);
		slider.prev();
	});
	$(slider.btnNext).on('click', function (e) {
		e.preventDefault();
		console.log(2);
		slider.next();
	});
	setInterval(() => {
		slider.prev();
	}, 2000);

};

/*------------//Slider JQUERY анимация ООП---------------------*/
/*------------Slider JQUERY движение ООП---------------------*/

function SliderMove(obj) {

	this.images = $(obj.images);
	this.auto = obj.auto;
	this.prev = $(obj.btnPrev);
	this.next = $(obj.btnNext);
	this.rate = obj.rate || 1000;

	var i = 0,
		slider = this,
		sliderWidth = slider.images.eq(0).width();

	this.prev.on('click', function () {
		move(-1, -sliderWidth);
	});

	this.next.on('click', function () {
		move(1, sliderWidth);
	});

	function move(direction, moveLeft) {


		slider.images.eq(i).animate({
			opacity: 0,
			left: moveLeft
		}, 1000);

		i += direction;

		if (i < 0) {
			i = slider.images.length - 1;
		} else if (i >= slider.images.length) {
			i = 0;
		}

		var sliderShow = slider.images.eq(i);
		sliderShow.css({
			"left": -moveLeft
		});

		sliderShow.animate({
			opacity: '1',
			left: 0,
		}, 1000);
	}

	if (slider.auto) {
		setInterval(function () {
			move(1, sliderWidth);
		}, slider.rate);
	}

};


/*------------//Slider JQUERY движение ООП---------------------*/

/*--------------Slider JQUERY движение не ООП-------------------*/
$(function () {
	var images = $('.gallery-3 .photos img'),
		auto = true,
		wrap = $('.gallery-3 .photos'),
		btnPrev = $('.gallery-3 .buttons .prev'),
		btnNext = $('.gallery-3 .buttons .next'),
		rate = 2000,
		i = 0,
		left = 0,
		top = 0,

		prev = function () {
			//slider.images.eq(i).removeClass("showed");		
			i--;
			if (i < 0) {
				i = images.length - 1;
			}
			//left = images.eq(0).width() * i + 'px';
			left = 860 * i + 'px';
			//console.log(left);

			wrap.css({
				"transform": "translate(-" + left + ")"
			});
		},

		next = function () {

			i++;
			//console.log(images.length);
			//console.log(i);

			if (i >= images.length) {
				i = 0;
			}

			left = 860 * i + 'px';
			//console.log(left);
			//console.log(typeOf left);
			wrap.css({
				"transform": "translate(-" + left + ")"
			});
		};

	btnPrev.on("click", function (e) {
		e.preventDefault();
		prev();
	});
	btnNext.on("click", function (e) {
		e.preventDefault();
		next();
	});

	if (auto) {
		setInterval(function () {
			next();
		}, rate);
	}

});
/*--------//----------------*/

/*-------Slider Moving ООП----------*/
$(function () {
	// new SliderA({
	// 	images: '.gallery-4 .photos img',
	// 	btnPrev: '.gallery-4 .buttons .prev',
	// 	btnNext: '.gallery-4 .buttons .next',
	// 	auto: true,
	// 	rate: 3000
	// });

	new SliderAnim({
		images: '.gallery-5 img',
		btnPrev: '.gallery-5 .buttons .prev',
		btnNext: '.gallery-5 .buttons .next',
		auto: true,
		rate: 3000
	});

});

function SliderA(obj) {
	this.images = $(obj.images);
	this.btnPrev = $(obj.btnPrev);
	this.btnNext = $(obj.btnNext);
	this.auto = obj.auto;
	this.rate = obj.rate;

	var slider = this,
		i = 0,
		direction = 1,
		animTime = 1000,
		wrap = slider.images.parent(),
		sliderWidth = slider.images.eq(0).width();

	console.log('sliderWidth: ' + sliderWidth);



	this.move = function (direction) {
		var showSlide = slider.images.eq(i);

		showSlide.css({
			"opacity": 1,
			"left": 0
		});
		showSlide.animate({
				"opacity": 0,
				"left": (-sliderWidth * direction) + 'px'

			}, animTime, "linear"

		);

		i += direction;
		if (i < 0) {
			i = slider.images.length - 1;
		}
		if (i >= slider.images.length) {
			i = 0;
		}

		var nextSlide = slider.images.eq(i);
		nextSlide.css({
			"opacity": 0,
			"left": sliderWidth * direction
		});

		nextSlide.animate({

				"opacity": 1,
				"left": 0

			}, animTime, "linear",
			function () {
				wrap.removeClass('move')
			}

		);



	}

	if (slider.auto) {

		var moving = setInterval(() => {
			//direction = 1;
			slider.move(direction);

		}, slider.rate);

	slider.btnPrev.on('click', function (e) {

		e.preventDefault();
		e.stopPropagation();
		clearInterval(moving);
		if (wrap.hasClass('move')) {
			return;
		} else {
			wrap.addClass('move');
		direction = -1;
		slider.move(direction);
		}

	});

	slider.btnNext.on('click', function (e) {
		e.preventDefault();
		e.stopPropagation();
		clearInterval(moving);
		if (wrap.hasClass('move')) {
			return;
		} else {
			wrap.addClass('move');
			direction = 1;
			slider.move(direction);
			// setTimeout(() => {
			// 	wrap.removeClass('move')
			// }, animTime);
		}

	});

	



		wrap.on('mouseover', function () {
			clearInterval(moving);
		});

		wrap.on('mouseout', function () {
			moving = setInterval(() => {
				//direction = 1;
				slider.move(direction);

			}, slider.rate);
		});


	}

}


/*-------//Slider Moving ООП----------*/
/*-------Slider plagin----------*/

// $('.gallery-6').sliderWebprogrammer77({
// 	images: '.gallery-6 img',
// 		btnPrev: '.gallery-6 .buttons .prev',
// 		btnNext: '.gallery-6 .buttons .next',
// 		auto: true,
// 		rate: 3000
// });
/*-------//Slider plagin----------*/