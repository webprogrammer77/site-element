(function ($) {
	$.fn.sliderWebprogrammer77 = function (settings) {
		var defaults = {
				images: 'img',
				btnPrev: '.buttons .prev',
				btnNext: '.buttons .next',
				auto: true,
				rate: 3000
			},
			options = $.extend(defaults, settings);

		this.each(function () {

			var slider = $(this),
				i = 0,
				direction = 1,
				bez = 'linear',
				stop = true,
				animTime = 1000,
				images = slider.find($(options.images)),
				btnPrev = slider.find($(options.btnPrev)),
				btnNext = slider.find($(options.btnNext)),
				auto = options.auto,
				rate = options.rate,
				wrap = images.parent(),
				sliderWidth = images.width(),
				imagesLength = images.length;
			isRun = false;

			function next() {
				if (isRun) {
					return;
				}
				isRun = true;

				wrap.animate({
					left: -sliderWidth + 'px'

				}, animTime, bez, function () {
					images = slider.find($(options.images)),
						images.first().clone().appendTo(wrap);
					images.first().remove();
					wrap.css('left', 0);
					isRun = false;

				})
			}

			function prev() {
				if (isRun) {
					return;
				}
				isRun = true;

				images = slider.find($(options.images)),
					images.eq(imagesLength - 1).clone().prependTo(wrap);
				images.last().remove();
				wrap.css('left', -sliderWidth);
				wrap.animate({
					left: '0px'

				}, animTime, bez, function () {
					images = slider.find($(options.images));

					isRun = false;

				})
			}

			if (auto) {

				var moving = setInterval(() => {
					//direction = 1;
					direction == 1 ? next() : prev();

				}, rate);
				wrap.on('mouseover', function () {
					clearInterval(moving);
				});

				wrap.on('mouseout', function () {
					moving = setInterval(() => {
						//direction = 1;
						direction == 1 ? next() : prev();

					}, rate);
				});


			}

			btnPrev.on('click', function (e) {

				e.preventDefault();
				e.stopPropagation();
				clearInterval(moving);

				direction = -1;
				prev();


			});

			btnNext.on('click', function (e) {
				e.preventDefault();
				e.stopPropagation();
				clearInterval(moving);
				direction = 1;
				next()

			});









			/*

				var slider = $(this);

				var images = slider.find($(options.images));
				console.log(images);
				var auto = options.auto;

				var btnPrev = slider.find($(options.btnPrev));
				var btnNext = slider.find($(options.btnNext));
				console.log(btnNext);
				var rate = options.rate;
				

				var i = 0;				

				function prev() {
					images.eq(i).removeClass('showed');
					i--;

					if (i < 0) {
						i = images.length - 1;
					}

					images.eq(i).addClass('showed');
				}

				function next() {
					images.eq(i).removeClass('showed');
					i++;

					if (i >= images.length) {
						i = 0;
					}

					images.eq(i).addClass('showed');
				}

				$(btnPrev).on('click', prev);
				$(btnNext).on('click', next);

				if (auto) {
					setInterval( function(){next()}, rate);
				}

			*/
			/*
			var slider = $(this),
			i = 0,
			images = slider.find($(options.images)),
			btnPrev = slider.find($(options.btnPrev)),
			btnNext = slider.find($(options.btnNext)),
			auto = options.auto
			rate = options.rate,
			direction = 1,
			animTime = 1000,
			wrap = images.parent(),
			sliderWidth = images.eq(0).width();
			
			

			function move(direction) {
				direction = direction || 1;
				var showSlide = images.eq(i);
				console.log(showSlide);

				showSlide.css({
					"opacity": 1,
					"left": 0
				})
				.animate({
						//"opacity": 0,
						"left": (-sliderWidth * direction) + 'px'

					}, animTime, "linear"

				);

				i += direction;
				if (i < 0) {
					i = images.length - 1;
				}
				if (i >= images.length) {
					i = 0;
				}

				var nextSlide = images.eq(i);

				nextSlide.css({

					//"opacity": 0,
					"left": sliderWidth * direction

				})
				.animate({

						"opacity": 1,
						"left": 0

					}, animTime, "linear",
					function () {

						wrap.removeClass('move')

					}
				);
			}
			if (auto) {

				var moving = setInterval(() => {
					// direction = 1;
					// console.log(direction);
					
					move(direction);

				}, rate);

				wrap.on('mouseover', function () {
					clearInterval(moving);
				});

				wrap.on('mouseout', function () {
					moving = setInterval(() => {
						//direction = 1;
						move(direction);

					}, rate);
				});	

			}

			btnPrev.on('click', function (e) {

				e.preventDefault();
				e.stopPropagation();
				clearInterval(moving);
				if (wrap.hasClass('move')) {
					return;
				} else {
					wrap.addClass('move');
					direction = -1;
					move(direction);
				}

			});
		  btnNext.on('click', function (e) {
				e.preventDefault();
				e.stopPropagation();
				clearInterval(moving);
				if (wrap.hasClass('move')) {
					return;
				} else {
					wrap.addClass('move');
					direction = 1;
					move(direction);
					// setTimeout(() => {
					// 	wrap.removeClass('move')
					// }, animTime);
				}

			});
			*/

		});

		return this;

	};

})(jQuery)