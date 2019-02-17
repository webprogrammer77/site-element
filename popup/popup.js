function Popup(options){
	this.overlay = document.querySelector(options.overlay);
	this.modal = document.querySelector(options.modal);

	var popup = this;

	this.open = function (content) {
		popup.modal.classList.add('open');
		popup.overlay.classList.add('open');
		popup.modal.innerHTML = content;
	}

		this.close = function() {
			popup.modal.classList.remove('open');
			popup.overlay.classList.remove('open');			
		}

		this.overlay.onclick = function(e){
			e.stopPropagation();
			popup.close();
		}
	

}
window.onload = function() {

	var dataPopup = document.querySelectorAll('.popup-inner__link');
	//var popupsignIn = document.querySelectorAll('[data-popup="signin-popup"]');

	
		for (var i = 0; i < dataPopup.length; i++){
			dataPopup[i].onclick = function(e){
				
				e.preventDefault();
				var popup = '.' + this.dataset.popup;
				
				var p = new Popup({
					modal: '.popup-modal',
					overlay: '.popup-overlay'
				});
				var content = document.querySelector(popup);
				p.open(content.innerHTML)
				console.log(content.innerHTML);
				
				
			}
	}

}
