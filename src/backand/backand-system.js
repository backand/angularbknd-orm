function BackandSystem () {
    this.version = {
        url: '/api/system',
            getInfo: function (successCallback, errorCallback) {
            backand.network.json(backand.options.url + backand.system.version.url, null, backand.options.verbs.get, successCallback, errorCallback);
        }
    }
}