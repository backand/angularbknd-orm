(function BackandJqueryAdaptor ($, backand) {

    backand.network.json = function (url, data, verb, successCallback, errorCallback, forToken) {
        $.ajax({
            url: url,
            type: verb,
            beforeSend: function (xhr) {
                if (!forToken)
                    xhr.setRequestHeader('Authorization', backand.security.authentication.token);
            },
            data: data,
            dataType: 'json',
            cache: false,
            error: function (xhr, textStatus, err) {
                if (errorCallback) errorCallback(xhr, textStatus, err);
            },
            success: function (data, textStatus, xhr) {
                if (successCallback) successCallback(data, textStatus, xhr);
            }
        });
    };

    backand.network.file = function (url, data, verb, successCallback, errorCallback) {
        $.ajax({
            url: url,
            type: verb,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', backand.security.authentication.token);
            },
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            error: function (xhr, textStatus, err) {
                if (xhr && textStatus && err) errorCallback(xhr, textStatus, err);
            },
            success: function (data, textStatus, xhr) {
                if (successCallback) successCallback(data, textStatus, xhr);
            }
        });
    };
})($, backand);