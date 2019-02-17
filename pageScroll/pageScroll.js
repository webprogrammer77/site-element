$(function () {

	var menu = $('.menu');
	var menuItems = menu.find('a');
	menuItems.on('click', function (e) {
		e.preventDefault();
		$('.menu a').removeClass('active').filter(this).addClass('active');

		var selector = $(this).attr('href'); /* #about - строка */
		var h = $(selector); /* jquery-элемент заголовка */

		$('html, body').animate({
			scrollTop: h.offset().top - 70
		}, 1400);

	});
	var dropTop = $('<div>')
	.appendTo($('body'))
	.addClass('dropTop').css({
		'width': '40px',
		'height': '40px',
		'position': 'fixed',
		'bottom': '50px',
		'right': '50px',
		'background': 'rgba(0,0,0,0.3)',
		'borderRadius': '5px',
		'zIndex': '1000',
		'display': 'none',
		'cursor': 'pointer',
		'textAlign':'center'		
	});

	var dropTopInit = function(){
		if ($(document).scrollTop() >= 400) {

			dropTop.fadeIn(300);

		} else {

			dropTop.fadeOut(300);

		}
	};
	var menuItemActive = function () {
		$('.menu a').each(function () {
			var selector = $(this).attr('href');
			var section = $(selector);

			var windowTop = $(window).scrollTop();
			var sectionTop = section.offset().top;

			//console.log(section.offset());
			//console.log(windowTop);
			//console.log(sectionTop);

			if (windowTop > sectionTop - 150) {
				$('.menu a').removeClass('active').filter(this).addClass('active');
			};
		});
	};

	dropTopInit();//чтобы при перезагрузке страницы кнопка показывалась
	menuItemActive();
	
	$(document).on('scroll', function () {
		//console.log($(document).scrollTop());
		dropTopInit();
		menuItemActive();
	})

	$('.dropTop').on('click', function () {

		$('body, html').animate({

			scrollTop: 0

		}, 500);

	});




});

/*
$(function () {

	$('.navigation a').on('click', function (e) {
		e.preventDefault();

		var selector = $(this).attr('href');
		var section = $(selector);

		$('html, body').animate({
			scrollTop: section.offset().top - 68
		}, 400);
	})


	$('.btn-up').on('click', function (e) {
		e.preventDefault();

		$('html, body').animate({
			scrollTop: 0
		}, 400);
	})

	scrolling();
	activeItemMenu();

	$(window).on('scroll', function (e) {

		activeItemMenu();
		scrolling();

	});

});



function activeItemMenu() {
	$(".item").each(function () {
		var selector = $(this).attr('href');
		var section = $(selector);

		var windowTop = $(window).scrollTop();
		var sectionTop = section.offset().top;

		//console.log(section.offset());
		//console.log(windowTop);
		//console.log(sectionTop);

		if (windowTop > sectionTop - 150) {
			$('.navigation a').removeClass('active').filter(this).addClass('active');
		};
	});
};

function scrolling() {
	if (scrollY > 100) {
		$('.btn-up').slideDown(400);
	} else {
		$('.btn-up').slideUp(400)
	}
};

*/


