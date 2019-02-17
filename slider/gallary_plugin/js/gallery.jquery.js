(function($){
    $.fn.gallery = function(settings){
        var defaults = {
            images: '.imgs',
            btnPrev: '.prev',
            btnNext: '.next',
            auto: false, 
            t: 2000
        };
        
        var options = $.extend(defaults, settings);

        this.each(function(){

            var imgset = $(options.images).find('img'); 
            var next =  $(options.btnNext);
            var prev =  $(options.btnPrev);
            var isRun = false;
            var i = 0; 
            var len = imgset.length;
            var delta = $(this).innerWidth();

            prev.on( 'click', function () {
                if (isRun) {return}
                move( -1 );
            });   

            next.on('click', function () {
                if (isRun) {return}
                move( 1 );
             });


            function move(direction) {
                isRun = true;

                $(imgset).eq(i).css('left', '0').animate({left: (delta * direction) + 'px'}, 1000);
         
                i += direction;
         
                if (i >= imgset.length) {
                    i = 0;
                }
                else if (i < 0) {
                    i = imgset.length - 1;
                }

                $(imgset).eq(i)
                    .css('left', ((delta-3) *(-direction)) + 'px')
                    .animate( {left: '0'}, 1000, function() {isRun = false;} );
            }

            if (options.auto) {
                if ( prev ) { prev.addClass('hide'); }
                if ( next ) { next.addClass('hide'); }
                tick( options.t, function() {
                    console.log('Круг замкнулся!');
                });
            }

            function tick(t, f) {
                var callback = f || function() {};
                
                timer = setInterval(function() {
                    move( 1 );
                    if ( i == len-1 ) {
                        callback();
                    }
                }, t);
            }
        });
        
        return this;
    };
})(jQuery);
