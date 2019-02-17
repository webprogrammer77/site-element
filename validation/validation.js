window.onload = function () {

	var form = document.querySelector('form'),
		input = document.querySelectorAll('input.form-control'),
		checkbox = document.querySelector('input[type="checkbox"]'),
		button = document.querySelector('input[type="submit"]'),
		classError = 'error';
	button.disabled = true;
	form.onsubmit = function (e) {

		var error = false;

		for (var i = 0; i < input.length; i++) {

			if (input[i].value === '') {

				input[i].classList.add(classError);						
				error = true;

			} else {

				input[i].classList.remove(classError);
			}
				if (checkbox.checked === false) {
					checkbox.classList.add(classError);
					error = true;
				}
			if (error) {

				e.preventDefault();

			}
		}
	}
	checkbox.onchange = function (e) {
		if (checkbox.checked) {
			checkbox.classList.remove(classError);
			for (var i = 0; i < input.length; i++) {
				if (input[i].value !== '') {
					button.disabled = false;
				} else {
					button.disabled = true;
				}
			}

		} else {
			checkbox.classList.add(classError);
			button.disabled = true;
		}
	}






	for (var i = 0; i < input.length; i++) {
		input[i].oninput = function () {

			this.classList.remove(classError);
			if (this.value === '' ) { 
				this.classList.add(classError) 
			 }else{
				this.classList.remove(classError);
				button.disabled = false;
			}			

		}
	}

	for (var i = 0; i < input.length; i++) {
		input[i].onfocus = function () {
			this.classList.remove(classError);
		}
	}

	for (var i = 0; i < input.length; i++) {
		input[i].onblur = function () {
			this.value === '' ? this.classList.add(classError) : this.classList.remove(classError);		
		}
	}







}