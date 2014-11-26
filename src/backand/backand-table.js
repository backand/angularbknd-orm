function BackandTable(name, cacheConfig) {
    this.name = name;
    this.cacheConfig = cacheConfig;
    this.get = function (id, deep, successCallback, errorCallback) {
        backand.api.table.data.getItem(this.name, id, deep, successCallback, errorCallback);
    };
    this.getList = function (pageNumber, pageSize, filter, sort, search, deep, successCallback, errorCallback) {
        if (filter && !(filter.constructor === Array))
            filter = [filter];
        if (sort && !(sort.constructor === Array))
            sort = [sort];
        if (deep == null || deep == undefined)
            deep = true;
        backand.api.table.data.getList(this.name, false, false, pageNumber, pageSize, filter, sort, search, deep, successCallback, errorCallback);
    };


    this.create = function (data, successCallback, errorCallback) {
        backand.api.table.data.createItem(this.name, JSON.stringify(data), successCallback, errorCallback, {returnObject: true});
    };

    this.update = function (id, data, successCallback, errorCallback) {
        backand.api.table.data.updateItem(this.name, id, JSON.stringify(data), successCallback, errorCallback, {returnObject: true});
    };

    this.delete = function (id, successCallback, errorCallback) {
        backand.api.table.data.deleteItem(this.name, id, successCallback, errorCallback);
    };

    this.config = function (successCallback, errorCallback) {
        var table = this;
        if (table.configData) {
            successCallback(table.configData);
        }
        else {
            backand.api.table.config.getItem(table.name, function (data) {
                for (var i = 0; i < data.fields.length; i++) {
                    var field = data.fields[i];
                    data.fields[field.name] = field;
                    field.update = function (successCallback, errorCallback) {
                        table.configData = null;
                    }

                    if (field.type == "SingleSelect") {
                        field.autoComplete = function (data, limit, successCallback, errorCallback) {
                            backand.api.table.data.autoComplete(table.name, this.name, {
                                term: data,
                                limit: limit ? limit : 20
                            }, successCallback, errorCallback);
                        }

                        field.selectOptions = function (successCallback, errorCallback) {
                            backand.api.table.data.selectOptions(table.name, this.name, successCallback, errorCallback);
                        }
                    }

                    if (field.type == "Image") {
                        field.upload = function (files, successCallback, errorCallback) {
                            backand.api.file.upload(table.name, this.name, files, successCallback, errorCallback);
                        }
                    }
                }

                // readonly array
                setReadonlyArray(data.fields);

                data.fields.create = function (data, successCallback, errorCallback) {
                    table.configData = null;

                }

                data.update = function (successCallback, errorCallback) {
                    table.configData = null;
                    backand.api.table.config.updateItem(table.name, JSON.stringify(this), successCallback, errorCallback);
                };

                data.newInstance = function () {
                    var o = {};

                    for (var i = 0; i < data.fields.length; i++) {
                        var field = data.fields[i];
                        o[field.name] = null;
                    }

                    return o;
                };

                if (table.cacheConfig) {
                    table.configData = data;
                }
                successCallback(data);
            }, errorCallback);
        }
    };

}