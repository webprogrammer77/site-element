function makeTimer() {

	var endTime = new Date("29 April 2020 9:56:00 GMT+01:00");
	endTime = (Date.parse(endTime) / 1000);

	var now = new Date();
	now = (Date.parse(now) / 1000);

	var timeLeft = endTime - now;

	var days = Math.floor(timeLeft / 86400);
	var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
	var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60);
	var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

	if (hours < "10") {
		hours = "0" + hours;
	}
	if (minutes < "10") {
		minutes = "0" + minutes;
	}
	if (seconds < "10") {
		seconds = "0" + seconds;
	}
var hprefix,dprefix,mprefix,sprefix;
	if(hours > 0){
		if(hours < 5  && hours >20){
			if(hours % 10 === 1){
				hprefix = 'час';
			} else if (hours % 10 === 2 || hours % 10 === 3 || hours % 10 === 4){
				hprefix = 'часа';
			}
		}else{
				hprefix = 'часов';
		}
	}
	if (days > 0){
		if (days < 5 && days >20){
			if (days % 10 === 1){
				dprefix = 'день';
			} else if (days % 10 === 2 || days % 10 === 3 || days % 10 === 4){
				dprefix = 'дня';
			}
		}else{
				dprefix = 'дней';
		}
	}
	if (minutes > 0) {
		if (minutes < 5 && minutes > 20) {
			if (minutes % 10 === 1) {
				mprefix = 'минута';
			} else if (minutes % 10 === 2 || minutes % 10 === 3 || minutes % 10 === 4) {
				mprefix = 'минуты';
			}
		} else {
			mprefix = 'минут';
		}
	}
	
	sprefix ='сек.';

	$("#days").html(days + "<span>"+ dprefix +"</span>");
	$("#hours").html(hours + "<span>" + hprefix +"</span>");
	$("#minutes").html(minutes + "<span>" + mprefix +"</span>");
	$("#seconds").html(seconds + "<span>" + sprefix +"</span>");

}

setInterval(function () {
	makeTimer();
}, 1000);

var stopTime1 = "29 April 2020 9:56:00 GMT+01:00";
var SetEndOrder = function (stopTime) {

	var endTime = new Date(stopTime);
	endTime = (Date.parse(endTime) / 1000);

	var now = new Date();
	now = (Date.parse(now) / 1000);

	var timeLeft = endTime - now;
	return timeLeft;
	
};
console.log(SetEndOrder(timeMeeting));
var setStyleEnd = function (timeMeeting, element){
	let timerEnd = setInterval(() => {
		let time = SetEndOrder(timeMeeting);
		if (time <= 0){
			clearInterval(timerEnd);
			$('.hidden-after', element).css({display: 'block'});
			$('.hidden-before', element).css({ display: 'none' });
			$('.btn.btn-primary.btn-small', element).removeClass('btn-primary').addClass('btn-cons');

		}else{
			$('.hidden-before', element).css({ display: 'block' });
			$('.hidden-after', element).css({ display: 'none' });
		}
		console.log(time);
		
	}, 10000);
}
setStyleEnd('21 February 2019 23:05:00 GMT+03:00', '.983');

//February,March,April,May...