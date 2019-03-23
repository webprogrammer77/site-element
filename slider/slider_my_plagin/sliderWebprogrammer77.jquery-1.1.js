(function ($) {
	$.fn.sliderWebprogrammer77 = function (settings) {
		var defaults = {
				images: 'img',
				btnPrev: '#prev',
				btnNext: '#next',
				auto: true,
				rate: 3000
			},
			optionce = $.extend(defaults, settings);

		this.each(function () {

			var slider = $(this),
				i = 0,
				direction = 1,
				bez = 'linear',
				stop = optionce.stop || true,
				animTime = optionce.animTime || 1000,
				images = slider.find($(optionce.images)),
				btnPrev = slider.find($(optionce.btnPrev)),
				btnNext = slider.find($(optionce.btnNext)),
				auto = optionce.auto,
				rate = optionce.rate,
				wrap = images.parent(),
				sliderWidth = images.width(),
				imagesLength = images.length;
				bullets = optionce.bullets || true;
			isRun = false;
			// images.first().clone().appendTo(wrap);
			images.last().clone().prependTo(wrap);
			if(bullets){
				slider.append('<ul class="pagination"></ul>');
				for(var k = 0; k < imagesLength; k ++){
					images.eq(k). addClass('slide' + k);
					slider.find('.pagination').append('<li class="pagination__item bullet' + k + '"></li>');
				}
				$('li.pagination__item').first().addClass('active');

			}
		
			function move(direction){
				if (isRun) {
					return;
				}
				isRun = true;

				i += direction;
				 
				if(i < 0 ){
					i = imagesLength-1;
					wrap.css({
						left: -imagesLength * sliderWidth-1 + 'px'
					});
				}
				if (i > imagesLength) {
						i = 1;
						wrap.css({
							left: 0
						});
				}
				
				var position = -sliderWidth * i + 'px';
				console.log(i);
				console.log(position);
					// wrap.css({
					// 			left: -sliderWidth * (i) + 'px'
					// });
				wrap.animate({
					left: position
				},animTime, bez, function(){
					isRun = false;
					$('.pagination li').not($('.pagination li').eq(i - 1)).removeClass('active')
					$('.pagination li').eq(i-1).addClass('active');
				})
			}

			

			if (auto) {

				var moving = setInterval(() => {
					//direction = 1;
					//direction == 1 ? next() : prev();
					move(direction);

				}, rate);

				wrap.on('mouseover', function () {
					clearInterval(moving);
				});

				wrap.on('mouseout', function () {
					moving = setInterval(() => {
						//direction = 1;
						//direction == 1 ? next() : prev();
						move(direction);
					}, rate);
				});


			}

			btnPrev.on('click', function (e) {

				e.preventDefault();
				//e.stopPropagation();
				clearInterval(moving);

				direction = -1;
				//prev();
				move(-1);


			});

			btnNext.on('click', function (e) {
				e.preventDefault();
				//e.stopPropagation();
				clearInterval(moving);
				direction = 1;
				//next();
				move(1);

			});

				$('.pagination li').on('click', function (e) {
						if (isRun) {
							return;
						}
						isRun = true;

					clearInterval(moving);
					n = $(this).index();
					i=n;
					$('.pagination li').not($(this)).removeClass('active');
					$(this).addClass('active');
					wrap.animate({
						left: -sliderWidth * (n+1) + 'px'
					},animTime,bez,function () {
						
							//moving = setInterval(() => {
								//direction = 1;
								//direction == 1 ? next() : prev();
								//move(direction);
							//}, rate);
							isRun = false;
					})
					//return i;
				});
				







			/*

			var slider = $(this);

			var images = slider.find($(optionce.images));
			console.log(images);
			var auto = optionce.auto;

			var btnPrev = slider.find($(optionce.btnPrev));
			var btnNext = slider.find($(optionce.btnNext));
			console.log(btnNext);
			var rate = optionce.rate;


			var i = 0;

			function prev() {
			images.eq(i).removeClass('showed');
			i--;

			if (i < 0) { i=images.length - 1; } images.eq(i).addClass('showed'); } function next() {
			 images.eq(i).removeClass('showed'); i++; if (i>= images.length) {
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
			images = slider.find($(optionce.images)),
			btnPrev = slider.find($(optionce.btnPrev)),
			btnNext = slider.find($(optionce.btnNext)),
			auto = optionce.auto
			rate = optionce.rate,
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
			if (i < 0) { i=images.length - 1; } if (i>= images.length) {
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
				// wrap.removeClass('move')
				// }, animTime);
				}

				});
				*/

		});

		return this;

	};

})(jQuery)