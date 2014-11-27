function BackandUtils () {}

BackandUtils.prototype.objectToQueryString = function (obj) {
    var params = [];

    for (var prop in obj)
        if(obj.hasOwnProperty(prop)) {
            params.push(encodeURIComponent(prop) + "=" + encodeURIComponent(obj[prop]));
        }

    return params.join("&");
};