function BackandUtils () {}

BackandUtils.prototype.objectToQueryString = function (obj) {

    var params = [];

    for (var prop in obj)
        if(obj.hasOwnProperty(prop)) {
            params.push(encodeURIComponent(prop) + "=" + encodeURIComponent(obj[prop]));
        }

    return params.join("&");
};

BackandUtils.prototype.getQueryString = function () {
    return window.location.href.slice(window.location.href.indexOf('?') + 1);
};
