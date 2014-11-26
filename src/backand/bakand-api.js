    function BackandApi () {
    /* app is the object the contains the information of all the general content of the app */
    this.app = {
        url: '/app/config',
            /* get the configuration information of the app */
            getConfig: function (successCallback, errorCallback) {
            var url = backand.options.getUrl(backand.api.app.url);
            backand.options.ajax.json(url, null, backand.options.verbs.get, successCallback, errorCallback);
        }
    };

    /* table is the object the contains the information about a database table or table */
    this.table = {
        config: {
            url: '/table/config/',
                /* get the configuration information of the table such as table name, columns names and columns types */
                getItem: function (name, successCallback, errorCallback) {
                var url = backand.options.getUrl(backand.api.table.config.url + name);
                backand.options.ajax.json(url, null, backand.options.verbs.get, successCallback, errorCallback);
            },
            getList: function (withSelectOptions, pageNumber, pageSize, filter, sort, search, successCallback, errorCallback) {
                var url = backand.options.getUrl(backand.api.table.config.url);
                var data = {
                    withSelectOptions: withSelectOptions,
                    pageNumber: pageNumber,
                    pageSize: pageSize,
                    filter: JSON.stringify(filter),
                    sort: JSON.stringify(sort),
                    search: search
                };
                backand.options.ajax.json(url, data, backand.options.verbs.get, successCallback, errorCallback);

            },
            createItem: function (data, successCallback, errorCallback) {
                var url = backand.options.getUrl(backand.api.table.config.url);
                backand.options.ajax.json(url, data, backand.options.verbs.post, successCallback, errorCallback);
            },
            updateItem: function (name, data, successCallback, errorCallback) {
                var url = backand.options.getUrl(backand.api.table.config.url + name);
                backand.options.ajax.json(url, data, backand.options.verbs.put, successCallback, errorCallback);
            },
            deleteItem: function (name, successCallback, errorCallback) {
                var url = backand.options.getUrl(backand.api.table.config.url + name);
                backand.options.ajax.json(url, null, backand.options.verbs.delete, successCallback, errorCallback);
            },
            getFieldByName: function (configTable, fieldName) {
                if (!configTable.hashFieldsByName) {
                    configTable.hashFieldsByName = {};
                    for (var i = 0; i < configTable.fields.length; i++) {
                        var field = configTable.fields[i];
                        configTable.hashFieldsByName[field.name] = field;
                    }
                }

                return configTable.hashFieldsByName[fieldName];
            }

        },
        /* get the table data */
        data : {
            url: '/table/data/',
                /* get a single row by the primary key (id) */
                getItem: function (name, id, deep, successCallback, errorCallback) {
                var url = backand.options.getUrl(backand.api.table.data.url + name + '/' + id);
                var data = {deep: deep};
                backand.options.ajax.json(url, data, backand.options.verbs.get, successCallback, errorCallback);
            },
            /* get a list of rows with optional filter, sort and page */
            getList: function (name, withSelectOptions, withFilterOptions, pageNumber, pageSize, filter, sort, search, deep, successCallback, errorCallback) {
                var url = backand.options.getUrl(backand.api.table.data.url + name);
                var data = {
                    withSelectOptions: withSelectOptions,
                    withFilterOptions: withFilterOptions,
                    pageNumber: pageNumber,
                    pageSize: pageSize,
                    filter: JSON.stringify(filter),
                    sort: JSON.stringify(sort),
                    search: search,
                    deep: deep
                };
                backand.options.ajax.json(url, data, backand.options.verbs.get, successCallback, errorCallback);

            },
            createItem: function (name, data, successCallback, errorCallback, params) {
                var url = backand.options.getUrl(backand.api.table.data.url + name)
                if (params)
                    url += '?' + backand.options.objectToQueryString(params);
                backand.options.ajax.json(url, data, backand.options.verbs.post, successCallback, errorCallback);
            },
            updateItem: function (name, id, data, successCallback, errorCallback, params) {
                var url = backand.options.getUrl(backand.api.table.data.url + name + '/' + id)
                if (params)
                    url += '?' + backand.options.objectToQueryString(params);
                backand.options.ajax.json(url, data, backand.options.verbs.put, successCallback, errorCallback);
            },
            deleteItem: function (name, id, successCallback, errorCallback) {
                var url = backand.options.getUrl(backand.api.table.data.url + name + '/' + id);
                backand.options.ajax.json(url, null, backand.options.verbs.delete, successCallback, errorCallback);
            },
            autoComplete: function (tableName, fieldName, data, successCallback, errorCallback) {
                var url = backand.options.getUrl(backand.api.table.data.url + "autocomplete/" + tableName + '/' + fieldName);
                backand.options.ajax.json(url, data, backand.options.verbs.get, successCallback, errorCallback);
            },
            selectOptions: function (tableName, fieldName, successCallback, errorCallback) {
                var url = backand.options.getUrl(backand.api.table.data.url + "selectOptions/" + tableName + '/' + fieldName);
                backand.options.ajax.json(url, null, backand.options.verbs.get, successCallback, errorCallback);
            }
        }

    };
    /* dashboard is a collection of charts */
    this.dashboard  = {
        config: {
            url: '/dashboard/config/',
                /* get the configuration information of a specific dashboard */
                getItem: function (id, successCallback, errorCallback) {
                var url = backand.options.getUrl(backand.api.dashboard.config.url + id);
                backand.options.ajax.json(url, null, backand.options.verbs.get, successCallback, errorCallback);
            },
            getList: function (withSelectOptions, pageNumber, pageSize, filter, sort, search, successCallback, errorCallback) {
                var url = backand.options.getUrl(backand.api.dashboard.config.url);
                var data = {
                    withSelectOptions: withSelectOptions,
                    pageNumber: pageNumber,
                    pageSize: pageSize,
                    filter: JSON.stringify(filter),
                    sort: JSON.stringify(sort),
                    search: search
                };
                backand.options.ajax.json(url, data, backand.options.verbs.get, successCallback, errorCallback);

            },
        },
        /* get the data of all the charts in this dashboard */
        data: {
            url: '/dashboard/data/',
                getItem: function (id, successCallback, errorCallback) {
                var url = backand.options.getUrl(backand.api.dashboard.data.url + id);
                backand.options.ajax.json(url, null, backand.options.verbs.get, successCallback, errorCallback);
            },
        }

    };

    this.chart = {
        config: {
            url: '/chart/config/',
                /* get the configuration information of a specific chart */
                getItem: function (id, successCallback, errorCallback) {
                var url = backand.options.getUrl(backand.api.chart.config.url + id);
                backand.options.ajax.json(url, null, backand.options.verbs.get, successCallback, errorCallback);
            },
            getList: function (withSelectOptions, pageNumber, pageSize, filter, sort, search, successCallback, errorCallback) {
                var url = backand.options.getUrl(backand.api.chart.config.url);
                var data = {
                    withSelectOptions: withSelectOptions,
                    pageNumber: pageNumber,
                    pageSize: pageSize,
                    filter: JSON.stringify(filter),
                    sort: JSON.stringify(sort),
                    search: search
                };
                backand.options.ajax.json(url, data, backand.options.verbs.get, successCallback, errorCallback);

            },
        },
        data: {
            url: '/chart/data/',
                /* get the data of a specific chart */
                getItem: function (id, successCallback, errorCallback) {
                var url = backand.options.getUrl(backand.api.chart.data.url + id + '?' + backand.options.getQueryString());
                backand.options.ajax.json(url, null, backand.options.verbs.get, successCallback, errorCallback);
            },
        }

    };

    this.content = {
        config: {
            url: '/content/config/',
                /* get the configuration information of a specific content */
                getItem: function (id, successCallback, errorCallback) {
                var url = backand.options.getUrl(backand.api.content.config.url + id);
                backand.options.ajax.json(url, null, backand.options.verbs.get, successCallback, errorCallback);
            },
            getList: function (withSelectOptions, pageNumber, pageSize, filter, sort, search, successCallback, errorCallback) {
                var url = backand.options.getUrl(backand.api.content.config.url);
                var data = {
                    withSelectOptions: withSelectOptions,
                    pageNumber: pageNumber,
                    pageSize: pageSize,
                    filter: JSON.stringify(filter),
                    sort: JSON.stringify(sort),
                    search: search
                };
                backand.options.ajax.json(url, data, backand.options.verbs.get, successCallback, errorCallback);

            },
        }
    }

    this.file = {
        url: '/file/upload/',
            upload: function (tableName, fieldName, files, successCallback, errorCallback) {
            var url = backand.options.getUrl(backand.api.file.url + tableName + '/' + fieldName);
            var data = new FormData();
            for (var i = 0; i < files.length; i++) {
                data.append(i, files[i]);
            }
            backand.options.ajax.file(url, data, backand.options.verbs.post, successCallback, errorCallback);
        }
    }
};