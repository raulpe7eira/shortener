+(($) => {
    'use strict';

    let shortenURL = () => {
        $.post(`/shortener/create/?${$.param({ url: $('#url-field').val(), CUSTOM_ALIAS: $('#alias-field').val() })}`)
            .done((res) => {
                let resultHTML =
                    `<div class="alert alert-success alert-dismissible" role="alert">
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                        <span class="sr-only">Success:</span> Your Short URL <a href="${res.url}" class="alert-link" target="_blank">${res.url}</a> is DONE!
                    </div>`;
                $('#response').html(resultHTML);
                $('#response').hide().fadeIn('slow');
            })
            .fail((err) => {
                if (err.responseJSON) {
                    let resultERR =
                        `<div class="alert alert-danger alert-dismissible" role="alert">
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                            <span class="sr-only">Error:</span> <strong>${err.responseJSON.err_code} - ${err.responseJSON.description}</strong>
                        </div>`;
                    $('#response').html(resultERR);
                    $('#response').hide().fadeIn('slow');
                }
            });
    };

    let retrieveURL = () => {
        $.ajax({
            url: `/shortener/u/${$('#alias-field').val()}`,
            type: 'GET',
            crossDomain: true,
            statusCode: {
                302: function(jqXHR) {
                    if (jqXHR.getResponseHeader('Location') != null) { 
                        window.open(jqXHR.getResponseHeader('Location'), '_blank');
                    }
                }
            },
            error: (err) => {
                if (err.responseJSON) {
                    let resultERR =
                        `<div class="alert alert-danger alert-dismissible" role="alert">
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                            <span class="sr-only">Error:</span> <strong>${err.responseJSON.err_code} - ${err.responseJSON.description}</strong>
                        </div>`;
                    $('#response').html(resultERR);
                    $('#response').hide().fadeIn('slow');
                }
            },
        });
    };

    let reportTopTen = () => {
        $.get('/shortener/topTen')
            .done((res) => {
                let resultHTML =
                    `<div class="panel panel-default table-responsive">
                        <table class="table table-striped table-hover table-condensed">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Short URL</th>
                                    <th>Original URL</th>
                                    <th>Retrieved</th>
                                </tr>
                            </thead>
                            <tbody>`;
                $.each(res.topTen, (i, item) => {
                    resultHTML +=
                        `<tr>
                            <th scope="row">${i+1}</th>
                            <td><a href="/shortener/u/${item.alias}" target="_blank">http://shortener/u/${item.alias}</a></td>
                            <td>${item.url}</td>
                            <td>${item.retrieved}</td>
                        </tr>`;
                });
                resultHTML +=
                            `<tbody>
                        </table>
                    </div>`;
                $('#topTen').html(resultHTML);
                $('#topTen').hide().fadeIn('slow');
            });
    };

    $(document).on('click.bs.button.data-api', '[data-toggle^="button"]', () => {
        if ($('input:checked')[0].id === 'shorten') {
            $('#url-field').prop('disabled', false);
            $('#url-field').val('');            
        } else {
            $('#url-field').prop('disabled', true);
            $('#url-field').val('http://shortener/u/');
        }
    });

    $('#btn-shorten').on('click', () => {
        if ($('input:checked')[0].id === 'shorten') {
            shortenURL();
        } else {
            retrieveURL();
        }
    });

    $('#btn-refresh').on('click', () => {
        reportTopTen();
    });

    $(window).on('load', () => {
        $('#btn-refresh').click();
    });

})(jQuery);