$(document).ready(function() {

	$('form').on('submit', function(event) {

		$.ajax({
			data : {
				name : $('#nameInput').val(),
				email : $('#emailInput').val()
			},
			type : 'POST',
			url : '/process'
		})
		.done(function(data) {

			if (data.error) {
				$('#errorAlert').text(data.error).show();
				$('#successAlert').hide();
			}
			else {
				$('#successAlert').text(data.name).show();
				$('#errorAlert').hide();
			}

		});

		event.preventDefault();
		
	});

		// var csrf_token = "{{ csrf_token() }}";
		// var csrftoken = $('meta[name=csrf-token]').attr('content')
		// console.log('mr: ', document.getElementById('csrf_token').value);
		// console.log('my csrf_token before send: ', csrf_token);
		//note: on browser inspector you better have this otherwise it's wrong...
		//X-CSRFToken:IjAwNjgzYjdmZGQ1NDBlNmFlNThjNj…g.ICPunXho3OEPCnOqhnXqilegbY4
		
		$.ajaxSetup({
			beforeSend: function(xhr, settings) {
				var csrftoken = $('meta[name=csrf-token]').attr('content')
				console.log('my csrftoken before send: ', csrftoken);
				if (!/^(GET|HEAD|OPTIONS|TRACE)$/i.test(settings.type) && !this.crossDomain) {
					xhr.setRequestHeader("X-CSRFToken", csrftoken);
				}
			}
		})

});