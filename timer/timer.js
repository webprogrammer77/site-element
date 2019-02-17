/*------------------------------------*/
var eventdate = new Date("January 05, 2020 00:00:00");
function toSt(n) {
	s = ""
	if (n < 10) s += "0"
	return s + n.toString();
}

function countdown() {
	var cl = document.querySelector('.clock'),
		d = new Date(),
		count = Math.floor((eventdate.getTime() - d.getTime()) / 1000);//разница в секундах 29380637

	if (count <= 0) {
		cl.querySelector('.days').innerHTML = "----";
		cl.querySelector('.hours').innerHTML = "--";
		cl.querySelector('.mins').innerHTML = "--";
		cl.querySelector('.secs').innerHTML = "--";
		return;
	}
	/*--получаем секунды в минуте-*/
	cl.querySelector('.secs').innerHTML = toSt(count % 60) //кол-во секунд 60
	/*--получаем минуты в часе-*/
	count = Math.floor(count / 60);
	cl.querySelector('.mins').innerHTML = toSt(count % 60); //кол-во минут 360

	count = Math.floor(count / 60);
	cl.querySelector('.hours').innerHTML = toSt(count % 24); //кол-во часов 21600
	count = Math.floor(count / 24);
	cl.querySelector('.days').innerHTML = count; //кол-во дней
	setTimeout("countdown()", 500);
}
setInterval(() => {
		countdown();
}, 1000);

	/*--------------------------*/

function get_elapsed_time_string(total_seconds) {
	function pretty_time_string(num) {
		return (num < 10 ? "0" : "") + num;
	}

	var hours = Math.floor(total_seconds / 3600);
	total_seconds = total_seconds % 3600;

	var minutes = Math.floor(total_seconds / 60);
	total_seconds = total_seconds % 60;

	var seconds = Math.floor(total_seconds);

	// Pad the minutes and seconds with leading zeros, if required
	hours = pretty_time_string(hours);
	minutes = pretty_time_string(minutes);
	seconds = pretty_time_string(seconds);

	// Compose the string for display
	var currentTimeString = hours + ":" + minutes + ":" + seconds;

	return currentTimeString;
}

var elapsed_seconds = 1000000;
setInterval(function () {
	elapsed_seconds = elapsed_seconds - 1;
	$('#box_header').text(get_elapsed_time_string(elapsed_seconds));
}, 1000);

/*--------------------------------------------------------------*/

/*---секундомер или таймер----*/

var seconds = $("#seconds").text(),
  seconds = parseInt(seconds),
int;
int = setInterval(function() { // запускаем интервал
if (seconds > 0) {
seconds--; // вычитаем таймер/прибавляем секундомер
$('#seconds').text(seconds); // выводим получившееся значение в блок
} else {
clearInterval(int); // очищаем интервал, чтобы он не продолжал работу при _Seconds = 0
alert('End!');
}
}, 1000);

// < div id = "seconds" > 10 < /div>

/*----------------------------------------------*/

/*------------ЧАСЫ ----------------------------------*/
	// 24 hour clock  
	setInterval(function () {

		var currentTime = new Date();
		var hours = currentTime.getHours();
		var minutes = currentTime.getMinutes();
		var seconds = currentTime.getSeconds();

		// Add leading zeros
		hours = (hours < 10 ? "0" : "") + hours;
		minutes = (minutes < 10 ? "0" : "") + minutes;
		seconds = (seconds < 10 ? "0" : "") + seconds;

		// Compose the string for display
		var currentTimeString = hours + ":" + minutes + ":" + seconds;
		$("#watch").html(currentTimeString);

	}, 1000);

	//<div class="clock"></div>
	
	/*-----------------------------*/
	function MyTimer(time) {
		this.start = function () {}
		this.stop = function () {}

		this.init = function (data) {};
		this.ontick = function (data) {};
		this.onend = function () {};

	}
	var t = new MyTimer(4800);
	t.oninit = function (data) {

	}
	t.ontick = function (data) {

	}
	t.onend = function () {

	}
	t.start();

	function MyTimerProb(time) {
		this.start = function () {
			Date.now();
		}
		this.stop = function () {}

		this.init = function (data) {};
		this.ontick = function (data) {};
		this.onend = function () {};

	}
	var data = {
		d: 2,
		h: 20,
		i: 22,
		s: 5,
		dWord: 'дня',
		hWord: 'часов',
		iWord: 'минут',
		sWord: 'секунд'
	}
	var t = new MyTimerProb(4800);
	t.oninit = function (data) {
		var timerDay = data.d*3600*24 || 0;
		var timerHour = data.h*3600 || 0;
		var timerMinute = data.i*60 || 0;
		var timerSecund = data.s || 0;
		var time = timerDay + timerHour + timerMinute + timerSecund;
		var timer = time - new Date().getTime();
		return timer;
	}
	t.ontick = function (data) {
		setInterval(function () {
			
		}, 1000);
	}
	t.onend = function () {

	}
	t.start();


	/*------------------------------*/

	//<p id="demoJs"></p>

	//<button id="demoJsStop" onclick = "clearInterval(myVar)"> Stop time </button>

window.onload = function () {
		
	var myVar = setInterval(myTimer, 1000);
	document.getElementById("demoJsStop").addEventListener('click', function(){clearInterval(myVar)});
	function myTimer() {
		var d = new Date();
		document.getElementById("demoJs").innerHTML = d.toLocaleTimeString();
	} 
	

}

/**--------------------------------------------- */
function countDown(second, endMinute, endHour, endDay, endMonth, endYear) {
	var now = new Date();
	second = (arguments.length == 1) ? second + now.getSeconds() : second;
	endYear = typeof (endYear) != 'undefined' ? endYear : now.getFullYear();
	endMonth = endMonth ? endMonth - 1 : now.getMonth(); //номер месяца начинается с 0 
	endDay = typeof (endDay) != 'undefined' ? endDay : now.getDate();
	endHour = typeof (endHour) != 'undefined' ? endHour : now.getHours();
	endMinute = typeof (endMinute) != 'undefined' ? endMinute : now.getMinutes();
	//добавляем секунду к конечной дате (таймер показывает время уже спустя 1с.) 
	var endDate = new Date(endYear, endMonth, endDay, endHour, endMinute, second + 1);
	var interval = setInterval(function () { //запускаем таймер с интервалом 1 секунду
			var time = endDate.getTime() - now.getTime();
			if (time < 0) { //если конечная дата меньше текущей
				clearInterval(interval);
				alert("Неверная дата!");
			} else {
				var days = Math.floor(time / 864e5);
				var hours = Math.floor(time / 36e5) % 24;
				var minutes = Math.floor(time / 6e4) % 60;
				var seconds = Math.floor(time / 1e3) % 60;
				var digit = '' +
					'';
				var text = ''
				var end = ':'
				document.getElementById('mytimer').innerHTML = 'осталось: ' +
					digit + days + text + 'Дней' + end + digit + hours + text + 'Часов' + end +
					digit + minutes + text + 'Минут' + end + digit + seconds + text + 'Секунд';
				if (!seconds && !minutes && !days && !hours) {
					clearInterval(interval);
					echo {
						'Кнопка'
					};
				}
			}

		}
	}
	countDown(30); //устанавливаем таймер на 30 секунд
/**--------------------------------------------- */
/**--------------------------------------------- */
(function ($) {
	var timebomb = function () {};

	timebomb.prototype = {
		defaults: {
			time: 5, // по умолчанию время в секундах
			countdown: '%COUNTDOWN% с. осталось',
			prize: 'Ура!',
		},
		init: function ($el, opts) {
			this.el = $el;
			this.opts = $.extend({}, this.defaults, opts || {});
			this.finish = (new Date).getTime() + 1000 * this.opts.time;
			this.update();
			this.interval = window.setInterval(this.update.bind(this), 50);
		},
		update: function () {
			var toGo = Math.round((this.finish - (new Date).getTime()) / 1000);
			if (toGo > 0) this.el.html(this.opts.countdown.replace('%COUNTDOWN%', toGo));
			else {
				window.clearInterval(this.interval);
				this.el.html(this.opts.prize);
			}
		}
	};

	$.fn.timebomb = function (opts) {
		var tb = new timebomb();
		tb.init(this, opts);
	}
})(jQuery);


// применение
$('#timer-1').timebomb({
	time: 6,
	countdown: 'Ждите ещё %COUNTDOWN% секунд',
	prize: '<button type="button" class="btn btn-success">Жми!</button>',
});

$('#timer-2').timebomb({
	time: 11
});
/**--------------------------------------------- */


