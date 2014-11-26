function BackandOptions() {
    this.url = '',
        this.version = '1',
        this.getUrl = function (apiUrl) {
            return this.url + '/' + this.version + apiUrl;
        };
    this.getQueryString = function () {
        return window.location.href.slice(window.location.href.indexOf('?') + 1);
    };
    this.objectToQueryString = function (obj) {
        var str = [];
        for (var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    };
    /* general ajax call for backand rest api */
    this.ajax = {
        json: function (url, data, verb, successCallback, erroCallback) {

        },
        file: function (url, data, verb, successCallback, erroCallback) {

        }
    };
    this.verbs = {get: "GET", put: "PUT", post: "POST", delete: "DELETE"}
}