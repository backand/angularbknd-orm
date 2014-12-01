function BackandTable(name, cacheConfig) {
    this.name = name;
    this.cacheConfig = cacheConfig;
    this.get = function (id, deep) {
        return backand.api.table.data.getItem(this.name, id, deep);
    };
    this.getList = function (pageNumber, pageSize, filter, sort, search, deep) {
        if (filter && !(filter.constructor === Array))
            filter = [filter];
        if (sort && !(sort.constructor === Array))
            sort = [sort];
        if (deep == null || deep == undefined)
            deep = true;
        return backand.api.table.data.getList(this.name, false, false, pageNumber, pageSize, filter, sort, search, deep);
    };

    this.add = function (data) {
        return backand.api.table.data.createItem(this.name, JSON.stringify(data), {returnObject: true});
    };

    this.update = function (id, data) {
        return backand.api.table.data.updateItem(this.name, id, JSON.stringify(data), {returnObject: true});
    };

    this.destroy = function (id) {
        return backand.api.table.data.deleteItem(this.name, id);
    };

    this.config = function () {
        var table = this;
        if (table.configData) {
            successCallback(table.configData);
        }
        else {
            backand.api.table.config.getItem(table.name, function (data) {
                for (var i = 0; i < data.fields.length; i++) {
                    var field = data.fields[i];
                    data.fields[field.name] = field;
                    field.update = function () {
                        table.configData = null;
                    };

                    if (field.type == "SingleSelect") {
                        field.autoComplete = function (data, limit) {
                            backand.api.table.data.autoComplete(table.name, this.name, {
                                term: data,
                                limit: limit ? limit : 20
                            });
                        };

                        field.selectOptions = function () {
                            backand.api.table.data.selectOptions(table.name, this.name);
                        }
                    }

                    if (field.type == "Image") {
                        field.upload = function (files) {
                            backand.api.file.upload(table.name, this.name, files);
                        }
                    }
                }

                // readonly array
                setReadonlyArray(data.fields);

                data.fields.add = function (data) {
                    table.configData = null;

                };

                data.update = function () {
                    table.configData = null;
                    return backand.api.table.config.updateItem(table.name, JSON.stringify(this));
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