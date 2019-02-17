$(function() {
    $(".exersize  a").click(function() {
    event.preventDefault();
    }); 
});
 $(function() {
   /* $(".l23 .slider-inner:before").click(function() {
    $(".l23 .slider-slides").css("transform","translate(-450px)");
    }); */

var slideNow = 1;
var slideCount = $(('.slider-slides').children().length);
var translateWidth = 0;
var slideInterval = 2000;

function nextSlide() {
    if (slideNow == slideCount || slideNow <= 0 || slideNow > slideCount) {
        $('.slider-slides').css('transform', 'translate(0, 0)');
        slideNow = 1;
    } else {
        translateWidth = -$('.slider-inner').width() * (slideNow);
        $('.slider-slides').css({
            'transform': 'translate(' + translateWidth + 'px, 0)',
            '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
            '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
        });
        slideNow++;
    }
}

  var switchInterval = setInterval(nextSlide, slideInterval);

    $('.slider-inner').hover(function(){
        clearInterval(switchInterval);
    },function() {
        switchInterval = setInterval(nextSlide, slideInterval);
    });
  function prevSlide() {
    if (slideNow == 1 || slideNow <= 0 || slideNow > slideCount) {
        translateWidth = -$('.slider-inner').width() * (slideCount - 1);
        $('.slider-slides').css({
            'transform': 'translate(' + translateWidth + 'px, 0)',
            '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
            '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
        });
        slideNow = slideCount;
    } else {
        translateWidth = -$('.slider-inner').width() * (slideNow - 2);
        $('.slider-slides').css({
            'transform': 'translate(' + translateWidth + 'px, 0)',
            '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
            '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
        });
        slideNow--;
    }
}  
$('.next-btn').click(function() {
        nextSlide();
    });

    $('.prev-btn').click(function() {
        prevSlide();
});
});


/*образцы функций*/

/*1. функция по клику мыши*/
$(function() {
    $(".class").click(function() { 
        // $(".class").removeClass('background-red').addClass("background-green");
        // $(".class").toggleClass("visible");
        // $('.class').append('ycnex<br/>');        
        // $('.class').text('успех');         
        // $(".class").attr("autofocus","autofocus");
        // $(".class").css("opacity","0");
        // $(".class").css("visibility","visible");
        // $(".class").css("transform","scale(0)");
        // $(".class").css("transform","translateY(-600px)");
        // $(".class").css("transform","translate(0, -600px)");
        /*  $('.class').css({
            "width":"500px",
            "padding":"200px"
        });*/      
        // window.open('http://webmaster-gambit.ru', '_blank');
    });  
});
// 2. функция на клику мыши с проверкой состояния checkbox
// для radio проверять нужно состояние только одного checkbox 
$(function() {  
  $(".class").click(function() {          
    // проверить состояние checkbox 
    if 	($(".class").prop('checked') && 
  		 $(".class").prop('checked')==false) 
    {
  		$(this).attr('disabled','disabled');       
    }
      
    else {
    	 $(".class").addClass('background-red').removeClass("background-green");
	    }    
  });
});
// 3. функция на клику мыши с проверкой текста введенного в input
// $('form input[type="text"]').val().replace(/\s+/g, '').toLowerCase() === 'worldwideweb';
$(function() {  
	$(".class").click(function() {
        /*распознаем текcт в инпуте*/    
      if ($('.class form input[type="text"]').val().replace(/\s+/g, '').toLowerCase() === 'worldwideweb' )
        {
          $(".class").removeClass('background-red').addClass("background-green");        
        }      
      else {
          $(".lclass").addClass('background-red').removeClass("background-green");
           }    
  });
});

// 4. функция слайдера 
function nextSlide() {
    if (slideNow == slideCount || slideNow <= 0 || slideNow > slideCount) {
        $('#slidewrapper').css('transform', 'translate(0, 0)');
        slideNow = 1;
    } else {
        translateWidth = -$('#viewport').width() * (slideNow);
        $('#slidewrapper').css({
            'transform': 'translate(' + translateWidth + 'px, 0)',
            '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
            '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
        });
        slideNow++;
    }
}
