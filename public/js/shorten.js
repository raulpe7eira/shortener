$('#btn-shorten').on('click', () => {

    $.ajax({
        url: `/shortener/create/?${$.param({ url: $('#url-field').val(), CUSTOM_ALIAS: $('#alias-field').val() })}`,
        contentType: 'application/json',
        type: 'POST',
        success: (data) => {
            var resultHTML = `<a href="${data.url}">${data.url}</a>`;
            $('#link').html(resultHTML);
            $('#link').hide().fadeIn('slow');
        }
    });

});