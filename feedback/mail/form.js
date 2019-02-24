$(function () {
	$('#form_caligraphy').validator({
			feedback: {
				success: 'glyphicon-thumbs-up',
				error: 'glyphicon-thumbs-down'
			}
		});

	// универсальная формула обработки форм
	var ajaxForm = function (form) {

		var url = form.attr('action'),
			data = form.serialize();

		return $.ajax({
			type: 'POST',
			url: url,
			data: data,
			dataType: 'JSON'
		});

	};

	// Обработка события

	var submitForm = function (e) {
		e.preventDefault();		
						
		var form = $(e.target);

		var request = ajaxForm(form);

		request.done(function (msg) {
			var mes = msg.mes,
				status = msg.status;
			if (status === 'OK') {
				//$('#popup_').hide(300);				
				//$('#success').fadeIn(500);
				$('#success_caligraphy').fadeIn(300);							
				$('.popup-overlay_caligraphy').fadeIn(300);				
								
				
				$(':input', '#form_caligraphy').not(':button, :submit, :reset, :hidden').val('').removeAttr('checked').removeAttr('selected');
				$('#privat').attr('checked','checked');
				$('.form-group').removeClass('has-success');
				//$('.er-phone').css('visibility', 'hidden');
			
			
			} else {
			
				//$('#error').fadeIn(500);
				//$('.er-phone').css('visibility', 'hidden');
				$(':input', '#form_caligraphy').not(':button, :submit, :reset, :hidden').val('').removeAttr('checked').removeAttr('selected');
				//$('#phone').css('borderColor', 'green');
				$('#error_caligraphy').fadeIn(300).delay(3000).fadeOut(300);
				$('.popup-overlay_caligraphy').fadeIn(300).delay(5000).fadeOut(300);
				$('#privat').attr('checked','checked');	
			}
			
		});

		request.fail(function (jqXHR, textStatus) {
			//$('#error').fadeIn(500);
			// alert("Request failed: " + textStatus);
			$('#error_caligraphy').fadeIn(300).delay(3000).fadeOut(300);
			$('.popup-overlay_caligraphy').fadeIn(300).delay(5000).fadeOut(300);
		});
		
		
	}

	$('#form_caligraphy').on('submit', submitForm);
	
	$('.request_caligraphy__close').on('click', function(e){
		e.preventDefault();
		
		$('#success_caligraphy').fadeOut(300);
		$('#error_caligraphy').fadeOut(300);

		$('.popup-overlay_caligraphy').fadeOut(300);
		$('.form-group').removeClass('has-success');
	});
	$('.popup-overlay_caligraphy').on('click', function(){
		
		$('#success_caligraphy').fadeOut(300);
		$('.popup-overlay_caligraphy').fadeOut(300);
		$('.form-group').removeClass('has-success');
	});
	
	





});