+function ($) {
    'use strict';

    $('#btn-shorten').on('click', () => {
        $.ajax({
            url: `/shortener/create/?${$.param({ url: $('#url-field').val(), CUSTOM_ALIAS: $('#alias-field').val() })}`,
            contentType: 'application/json',
            type: 'POST',
            success: (data) => {
                let resultHTML =
                    `<div class="alert alert-success alert-dismissible" role="alert">
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                        <span class="sr-only">Success:</span> Your Short URL <a href="${data.url}" class="alert-link">${data.url}</a> is DONE!
                    </div>`
                $('#response').html(resultHTML);
                $('#response').hide().fadeIn('slow');
            },
            error: (err) => {
                let resultHTML =
                    `<div class="alert alert-danger alert-dismissible" role="alert">
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                        <span class="sr-only">Error:</span> <strong>${err.responseJSON.err_code} - ${err.responseJSON.description}</strong>
                    </div>`
                $('#response').html(resultHTML);
                $('#response').hide().fadeIn('slow');
            }
        });
    });

    $('#btn-refresh').on('click', () => {
        $.ajax({
            url: '/shortener/top10',
            contentType: 'application/json',
            type: 'GET',
            success: (data) => {
                let resultHTML = '<div class="panel panel-default table-responsive"><table class="table table-striped table-hover table-condensed"><thead><tr><th>#</th><th>Short URL</th><th>Original URL</th><th>Retrieved</th></tr></thead><tbody>';
                $.each(data.top10, (i, item) => {
                    resultHTML += `<tr><th scope="row">${i+1}</th><td><a href="/shortener/u/${item.alias}">http://shortener/u/${item.alias}</a></td><td>${item.url}</td><td>${item.retrieved}</td></tr>`;
                });
                resultHTML += '<tbody></table></div>';
                $('#top10').html(resultHTML);
                $('#top10').hide().fadeIn('slow');
            }
        });
    });

    $(window).on('load', () => {
        $('#btn-refresh').click();
    });

}(jQuery);