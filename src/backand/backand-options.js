function BackandOptions() {

    this.url = '';
    this.version = '1';
    this.verbs = {get: "GET", put: "PUT", post: "POST", delete: "DELETE"};

    this.getUrl = function (apiUrl) {
        return this.url + '/' + this.version + apiUrl;
    };

    this.getQueryString = function () {
        return window.location.href.slice(window.location.href.indexOf('?') + 1);
    };

    this.objectToQueryString = function (obj) {
        var params = [];

        for (var prop in obj)
            if(obj.hasOwnProperty(prop)) {
                params.push(encodeURIComponent(prop) + "=" + encodeURIComponent(obj[prop]));
            }

        return params.join("&");
    };

    /* general ajax call for backand rest api */
    this.ajax = {
        json: function (url, data, verb, successCallback, errorCallback) {},
        file: function (url, data, verb, successCallback, errorCallback) {}
    };

}