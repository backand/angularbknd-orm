function BackandSystem () {
    this.version = {
        url: '/api/system',
            getInfo: function (successCallback, errorCallback) {
            backand.options.ajax.json(backand.options.url + backand.system.version.url, null, backand.options.verbs.get, successCallback, errorCallback);
        }
    }
};