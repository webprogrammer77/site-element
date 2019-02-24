$(function () {
	$("#slick").slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: !0,
		autoplaySpeed: 3e3,
		speed: 400,
		asNavFor: "#slick-nav",
		swipeToSlide: !1,
		arrows: !0,
		appendArrows: ".arrow-slick",
		prevArrow: '<button class="slick-arrow slick-prev"><i class="fas fa-arrow-left"></i></button>',
		nextArrow: '<button class="slick-arrow slick-next"><i class="fas fa-arrow-right"></i></button>'
	}), $("#slick-nav").slick({
		slidesToShow: 4,
		slidesToScroll: 4,
		infinite: !1,
		arrows: !1,
		focusOnSelect: !0,
		autoplay: !1,
		asNavFor: "#slick"
	})
});
