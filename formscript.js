//edit-field-vashe-imya-0-value
//edit-field-telefon-0-value

//contact-message-order-support-form
//edit-submit

function saveInput() {
    const formData = {
        name: $('#edit-field-vashe-imya-0-value').val(),
        phone: $('#edit-field-telefon-0-value').val(),
        email: $('#edit-field-e-mail-0-value').val(),
        comment: $('#edit-field-vash-0-value').val()
    };

    // Сохранение данных в LocalStorage
    localStorage.setItem('name', formData.name);
    localStorage.setItem('phone', formData.phone);
    localStorage.setItem('email', formData.email);
    localStorage.setItem('comment', formData.comment);

    return formData;
}

$(document).ready(function() {
    $('#edit-field-vashe-imya-0-value').val(localStorage.getItem('name'));
    $('#edit-field-telefon-0-value').val(localStorage.getItem('phone'));
    $('#edit-field-e-mail-0-value').val(localStorage.getItem('email'));
    $('#edit-field-vash-0-value').val(localStorage.getItem('comment'));

    $('#supportForm').on('change', function(event) {
    	saveInput();

    });

    $('#supportForm').on('submit', function(event) {
    	event.preventDefault();
    	const formData = saveInput();

    	$.ajax({
    		url: 'https://formcarry.com/s/5iAMBhlVwiU',
    		method: 'POST',
    		dataType: 'json',
    		data: formData,
            success: function(response) {
            	console.log(response.status);
                if (response.status == "success") {
                    $('#responseMessage').text('Ваше сообщение успешно отправлено!').css('color', 'cyan').show();
                    $('#supportForm')[0].reset(); // Очистка формы
                    localStorage.clear(); // Очистка LocalStorage
                }
                else {
                    $('#responseMessage').text('Произошла ошибка: '+ response.status + ' - пожалуйста, попробуйте ещё раз!').css('color', 'red').show();
                }
            },
            error: function(response) {
                $('#responseMessage').text(response.status + ' - ' + response.message).css('color', 'red').show();
            }
    	});
    });
});
