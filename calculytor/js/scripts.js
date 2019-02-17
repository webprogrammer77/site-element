window.onload = function (e) {

/*------------ calc ----------------------------------------------*/

	var inp1 = document.querySelector('.calc input[name=num1]');
	var inp2 = document.querySelector('.calc input[name=num2]');
	var span = document.querySelector('.calc .res');

	var buttons = document.querySelectorAll('.calc input[type=button]');

	for (var i = 0; i < buttons.length; i++) {
		buttons[i].onclick = function () {
			var op = this.getAttribute('data-op');
			calcForm(op);
		}
	}

	function calcForm(op) {
		var a = parseInt(inp1.value);
		var b = parseInt(inp2.value);
		var res;

		if (op === '+') {
			res = a + b;
		} else if (op === '-') {
			res = a - b;
		} else if (op === '*') {
			res = a * b;
		} else if (op === '/') {
			res = a / b;
		} else {
			res = 'странная операция';
		}

		span.innerHTML = res;
	}
}

/*------------ calc1 ----------------------------------------------*/

var btn = document.querySelector('input[name=calc]');
var inp10 = document.querySelector('input[name=num10]');
var inp20 = document.querySelector('input[name=num20]');
var span10 = document.querySelector('.res10');

btn.onclick = function () {
	var res10 = parseInt(inp10.value) + parseInt(inp20.value);
	span10.innerHTML = res10;
	this.disabled = true;
}

inp10.oninput = btnEnable;
inp20.oninput = btnEnable;

function btnEnable() {
	btn.disabled = false;
}

/*------------ calc2 ----------------------------------------------*/

var btnAdd = document.querySelector('.calc2 input[type="button"]');
var inputAll = document.querySelector('.calc2 input[name="all"]');
var inputOrder = document.querySelector('.calc2 input[name="order"]');
var inputHidden = document.querySelector('.calc2 input[type="hidden"]');
//var spanOrders = document.querySelector('.calc2 span.orders');

var avails = inputAll.value;
var orderPost = inputHidden.dataset.order;
var order = inputOrder.value;


btnAdd.addEventListener('click', function (e) {
	
	e.preventDefault();
	avails = parseInt(avails);
	avails--;
	
	order = parseInt(order); 
	order++;

	inputOrder.value = order;
	inputAll.value = avails;
	inputHidden.dataset.order = order;
	
	
	
});