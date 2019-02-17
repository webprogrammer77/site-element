$(function () {

    $('.menu a').on('click', function (e) {
        e.preventDefault();
        
        $('.menu a').removeClass('active').filter(this).addClass('active');
        
        var selector = $(this).attr('href'); /* #about - строка */
        var h = $(selector); /* jquery-элемент заголовка */
        
        $('html, body').animate({
            scrollTop: h.offset().top - 70
        }, 400);
        
        
    });


});

/*

window.scrollTo(0, 1000);

window.scrollTo({
	top: 100,
	left: 100,
	behavior: 'smooth'
});


function getCoords(elem) { // кроме IE8-
	var box = elem.getBoundingClientRect();

	return {
		top: box.top + pageYOffset,
		left: box.left + pageXOffset
	};

}

var testDiv = document.getElementById("test");
document.getElementById("demo").innerHTML = testDiv.offsetTop;

*/