/*
window.onload = function () {
	var selector = 'button[data-toggle="collapse"]';
	var buttons = document.querySelectorAll(selector);
	for (var i = 0; i < buttons.length; i++) {
		var button = buttons[i];
		console.log('element: '+button);
		
		button.onclick = function (e) {
			e.preventDefault();
			// e.stopPropagation();
			var showIdItem = this.dataset.target;
			var showItem = document.querySelector(showIdItem);
			console.log(showItem);
			showItem.classList.toggle('show');
			
			
			var items = document.querySelectorAll('#accordionExample .collapse');
			for (var y = 0; y < items.length; y++) {
				var item = items[y];
				if(item.id !== showIdItem.replace('#','')){
					console.log('item.id: ' + item.id);
					console.log('showIdItem: ' + showIdItem);
					
					//
					console.log('showItem: ' + showItem);
					item.classList.remove('show');
					
					
				}  
			
			}
		}
		
	}
	
}
*/
$(function(){

 var acco = $('#accordionExample');
 var buttons = $('button[data-toggle="collapse"]', acco);
 var card = $('.card', acco);
 var items = $('.collapse', acco); 
 //var itemFirst = $('.collapse:first', acco); 
//  var itemFirst = items.eq(0);
 var itemFirst = items.filter(':first');
 //console.log(items);

 itemFirst.show();

 card.on('click',	function (e) {
		e.preventDefault();
		
		var showIdItem = $(this).find(buttons).attr('data-target');
		var showItem = $(showIdItem);
		
		items.not(showItem).slideUp(500);
		showItem.slideToggle(500);
		// showItem.slideDown(400);

		//items.not(showItem).removeClass('show');		
		//showItem.toggleClass('show');
 });


});

