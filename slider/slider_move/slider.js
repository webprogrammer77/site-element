$(function () {
	new Slider({
		slides: '.gallery .slides .slide',
		btnPrev: '.gallery .buttons .prev',
		btnNext: '.gallery .buttons .next',
		auto: true,
		rate: 3000
	});



});

function Slider(obj) {
	this.slide = $(obj.slides);
	this.btnPrev = $(obj.btnPrev);
	this.btnNext = $(obj.btnNext);
	this.auto = obj.auto;
	this.rate = obj.rate;

	var slider = this,
		run = false,
		i = 1,
		direction = 1,
		animTime = 1000,
		bez = 'linear',
		wrap = slider.slide.parent(),
		container = wrap.parent(),
		bullets = obj.bullets || true,
		slideLength = slider.slide.length,
		sliderWidth = slider.slide.eq(0).width();

	console.log('sliderWidth: ' + sliderWidth);
	 //slider.slide.eq(0).clone().appendTo(wrap);
	// slider.slide.eq(slideLength-1).clone().prependTo(wrap);

		slider.slide.last().clone().prependTo(wrap);
		if (bullets) {
			container.append('<ul class="pagination"></ul>');
			for (var k = 0; k < slideLength; k++) {
				slider.slide.eq(k).addClass('slide' + k);
				container.find('.pagination').append('<li class="pagination__item bullet' + k + '"></li>');
			}
			$('li.pagination__item').first().addClass('active');

		}
		wrap.css({
			left:"-250px"
		});
	this.move = function (direction) {
		// var showSlide = slider.slide.eq(i);
		if(run){
			return;
		}
		
		i += direction;
		run = true;
			if (i < 0) {
				i = slideLength - 1;
				wrap.css({
					left: -slideLength * sliderWidth - 1 + 'px'
				});
			}
			if (i > slideLength) {
				i = 1;
				wrap.css({
					left: 0
				});
			}

		console.log(i);
		console.log(-sliderWidth * i  + 'px');

		wrap.animate({
			
			left: -sliderWidth * (i)  + 'px'		
		}, animTime, 'linear', function () {

			run = false;
				$('.pagination li').not($('.pagination li').eq(i - 1)).removeClass('active')
				$('.pagination li').eq(i - 1).addClass('active');

		});		
		

	}

	if (slider.auto) {

		var moving = setInterval(() => {
			
			slider.move(direction);

		}, slider.rate);

	slider.btnPrev.on('click', function (e) {

		e.preventDefault();
			
		direction = -1;
		slider.move(direction);		

	});

	slider.btnNext.on('click', function (e) {
		e.preventDefault();
	
			direction = 1;
			slider.move(direction);

		});

	



		wrap.on('mouseover', function () {
			clearInterval(moving);
		});

		wrap.on('mouseout', function () {
			moving = setInterval(() => {
			
				slider.move(direction);

			}, slider.rate);
		});

			$('.pagination li').on('click', function (e) {
				if (run) {
					return;
				}
				run = true;

				clearInterval(moving);
				n = $(this).index();
				i = n;
				$('.pagination li').not($(this)).removeClass('active');
				$(this).addClass('active');
				wrap.animate({
					left: -sliderWidth * (n + 1) + 'px'
				}, animTime, bez, function () {	run = false;})
				
			});


	}

}

