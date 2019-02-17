$(function () {

	//$('.item > ').wrap('<div></div>');
	var items = $('.item > .w');

    $('.faq').owlCarousel({
        loop: true,
        margin: 10,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: true
            },
            600: {
                items: 3,
                nav: false
            },
            1000: {
                items: 5,
                nav: true,
                loop: false
            }
				},
				onInitialazed: function(){
					getMaxHeight($(items));
				
				},
			onResize: function () {
				 getMaxHeight($(items));
			}
			
			
				
		})

	
	
	console.log(getMaxHeight(items));

	
	function getMaxHeight(items) {

		var max = 0;

		items.each( function () {
			
				var h = $(this).outerHeight();
				
				
			if (h > max) {
				max = h;
			}
			
			
			
		})
		//console.log(max);
		items.css('minHeight',  max +'px');
		killBug();
		return max;
	}
	function killBug() {
		setTimeout(() => {
			$('.faq').trigger('refresh.owl.courusel');
		}, 1);		
	}
});
