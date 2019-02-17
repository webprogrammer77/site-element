$(function(){

     $('.gallery-1').gallery({
        images: '.gallery-1',
        btnPrev: '.gallery-1 .buttons .prev',
        btnNext: '.gallery-1 .buttons .next',
        auto: true, 
    });

    $('.gallery-2').gallery({
        images: '.gallery-2',
        btnPrev: '.b_prev',
        btnNext: '.b_next',
        auto: false, 
        t: 2000
    });

});