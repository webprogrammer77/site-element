/*--------------Slider JQUERY анимации ООП---------------------*/
new SliderAnim({
	images: '.gallery img',
	btnPrev: '.gallery .buttons .prev',
	btnNext: '.gallery .buttons .next',
	auto: true,
	rate: 3000
});


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