function BackandSystem (systemUrl) {
    this.version = {
        url: systemUrl,
            getInfo: function () {
            return backand.network.json(backand.options.url + backand.system.version.url, null, backand.options.verbs.get);
        }
    }
}