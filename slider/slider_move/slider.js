$(function () {
	new Slider({
		images: '.gallery .photos img',
		btnPrev: '.gallery .buttons .prev',
		btnNext: '.gallery .buttons .next',
		auto: true,
		rate: 3000
	});



});

function Slider(obj) {
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
			
			"left": 0
		});
		showSlide.animate({
				
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
			
			"left": sliderWidth * direction
		});

		nextSlide.animate({

				
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

