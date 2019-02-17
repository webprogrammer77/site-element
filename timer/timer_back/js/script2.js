$(function(){
    
    var act_period = {
        d: 20,
        h: 10,
        i: 10,
        s: 5,
    };
    var t = new Timer(act_period);
    t.oninit = function(data) {
        console.log(data);
        
        $('.action_time').html('задано время акции: '+ t.data.d + t.data.dWord + '  '  + t.data.h + t.data.hWord + '  ' + t.data.i + t.data.iWord + '  ' + t.data.s + t.data.sWord);
    }

    t.start();

    t.ontick = function(data) {
        console.log(data);
        $('.timer').html('Time Left: '+ t.data.d + t.data.dWord + '  '  + t.data.h + t.data.hWord + '  ' + t.data.i + t.data.iWord + '  ' + t.data.s + t.data.sWord);
    };
    t.onend =  function() {
        console.log('END');
        $('.timer').css('color', 'red').html("0:00:00 GAME OVER");
    }
});

function Timer(data){

    var def = {
        d: 0,
        h: 0,
        i: 1,
        s: 0,
        dWord: 'дня',
        hWord: 'часов',
        iWord: 'минуты',
        sWord: 'секунды',
    };

    this.data = $.extend( def, data); // здесь будет текущая распарсенное время

    var finish = this.data.d*24*60*60 + this.data.h*60*60 + this.data.i*60 + this.data.s;

    var time = finish; // time текущее время тика

    this.start = function() {
       this.oninit(this.data);
        
        if (time == finish) {
            timer = setInterval(tick, 1000);
        }
    }
    
    this.stop = function() {
        if (time != 0) {
             $('.timer').html('stop:');
            time = 0;
        }
    }

    this.oninit = function(data) {
    }

    this.ontick = function(data) {
    }

    this.onend =  function(data) {
    }
    
    var t = this;
    function tick(){
        time--;
        t.data = render(); 
        t.ontick(t.data);
        
        if (time <= 0){
            clearInterval(timer);
            t.onend(t.data);
        }
        return t.data;
    }
    
    function render () {

        function add_zero(digit) {
            if ( digit < 10) { str = '0'+ digit; } else { str = digit; }
            return str;
        }

        function get_num_ending(number, ending_arr) { 
            number = number % 100; 
            if (number >= 11 && number <= 19) { 
                ending = ending_arr[2]; 
            } else { 
                i = number % 10; 
                switch (i) { 
                    case (1): ending = ending_arr[0]; 
                        break; 
                    case (2): 
                    case (3): 
                    case (4): ending = ending_arr[1]; 
                        break; 
                    default: ending = ending_arr[2]; 
                } 
            } 
            return ending; 
        }

        var cur_time = {};
        cur_time.d = parseInt(time / (3600*24));
        dop = time - (cur_time.d * 3600*24); 

        cur_time.h = parseInt(dop / 3600);
        dop = time  - (cur_time.d * 3600*24) - (cur_time.h * 3600); 
         
        cur_time.i = parseInt(dop / 60);
        cur_time.s = time  - (cur_time.d * 3600*24) - (cur_time.h * 3600) - (cur_time.i*60);
        cur_time.h = add_zero(cur_time.h);
        cur_time.i = add_zero(cur_time.i);
        cur_time.s = add_zero(cur_time.s);

        cur_time.dWord = get_num_ending(cur_time.d, ['день', 'дня', 'дней']);
        cur_time.hWord = get_num_ending(cur_time.h, ['час', 'часа', 'часов']);
        cur_time.iWord = get_num_ending(cur_time.i, ['минута', 'минуты', 'минут']);
        cur_time.sWord = get_num_ending(cur_time.s, ['секунда', 'секунды', 'секунд']);
        
        return cur_time;
    }

}