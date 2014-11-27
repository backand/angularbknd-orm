function BackandApi(apiRoutes) {

    /* app is the object the contains the information of all the general content of the app */
    this.app = {
        url: apiRoutes.appUrl,
        getConfig: function (successCallback, errorCallback) {
            var url = backand.options.getUrl(backand.api.app.url);
            backand.network.json(url, null, backand.options.verbs.get, successCallback, errorCallback);
        }
    };

    /* table is the object the contains the information about a database table or table */
    this.table = {
        config: {

            url: apiRoutes.tableConfigUrl,

            getItem: function (name, successCallback, errorCallback) {
                var url = backand.options.getUrl(backand.api.table.config.url + name);
                backand.network.json(url, null, backand.options.verbs.get, successCallback, errorCallback);
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
                backand.network.json(url, data, backand.options.verbs.get, successCallback, errorCallback);

            },
            createItem: function (data, successCallback, errorCallback) {
                var url = backand.options.getUrl(backand.api.table.config.url);
                backand.network.json(url, data, backand.options.verbs.post, successCallback, errorCallback);
            },
            updateItem: function (name, data, successCallback, errorCallback) {
                var url = backand.options.getUrl(backand.api.table.config.url + name);
                backand.network.json(url, data, backand.options.verbs.put, successCallback, errorCallback);
            },
            deleteItem: function (name, successCallback, errorCallback) {
                var url = backand.options.getUrl(backand.api.table.config.url + name);
                backand.network.json(url, null, backand.options.verbs.delete, successCallback, errorCallback);
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
        data: {
            url: apiRoutes.tableDataUrl,
            /* get a single row by the primary key (id) */
            getItem: function (name, id, deep, successCallback, errorCallback) {
                var url = backand.options.getUrl(backand.api.table.data.url + name + '/' + id);
                var data = {deep: deep};
                backand.network.json(url, data, backand.options.verbs.get, successCallback, errorCallback);
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
                backand.network.json(url, data, backand.options.verbs.get, successCallback, errorCallback);

            },
            createItem: function (name, data, successCallback, errorCallback, params) {
                var url = backand.options.getUrl(backand.api.table.data.url + name);
                if (params)
                    url += '?' + backand.utils.objectToQueryString(params);
                backand.network.json(url, data, backand.options.verbs.post, successCallback, errorCallback);
            },
            updateItem: function (name, id, data, successCallback, errorCallback, params) {
                var url = backand.options.getUrl(backand.api.table.data.url + name + '/' + id);
                if (params)
                    url += '?' + backand.utils.objectToQueryString(params);
                backand.network.json(url, data, backand.options.verbs.put, successCallback, errorCallback);
            },
            deleteItem: function (name, id, successCallback, errorCallback) {
                var url = backand.options.getUrl(backand.api.table.data.url + name + '/' + id);
                backand.network.json(url, null, backand.options.verbs.delete, successCallback, errorCallback);
            },
            autoComplete: function (tableName, fieldName, data, successCallback, errorCallback) {
                var url = backand.options.getUrl(backand.api.table.data.url + "autocomplete/" + tableName + '/' + fieldName);
                backand.network.json(url, data, backand.options.verbs.get, successCallback, errorCallback);
            },
            selectOptions: function (tableName, fieldName, successCallback, errorCallback) {
                var url = backand.options.getUrl(backand.api.table.data.url + "selectOptions/" + tableName + '/' + fieldName);
                backand.network.json(url, null, backand.options.verbs.get, successCallback, errorCallback);
            }
        }

    };

    /* dashboard is a collection of charts */
    this.dashboard = {
        config: {
            url: apiRoutes.dashboardConfigUrl,
            /* get the configuration information of a specific dashboard */
            getItem: function (id, successCallback, errorCallback) {
                var url = backand.options.getUrl(backand.api.dashboard.config.url + id);
                backand.network.json(url, null, backand.options.verbs.get, successCallback, errorCallback);
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
                backand.network.json(url, data, backand.options.verbs.get, successCallback, errorCallback);

            }
        },

        /* get the data of all the charts in this dashboard */
        data: {
            url: apiRoutes.dashboardDataUrl,
            getItem: function (id, successCallback, errorCallback) {
                var url = backand.options.getUrl(backand.api.dashboard.data.url + id);
                backand.network.json(url, null, backand.options.verbs.get, successCallback, errorCallback);
            }
        }

    };
    this.chart = {
        config: {
            url: apiRoutes.chartConfigUrl,
            /* get the configuration information of a specific chart */
            getItem: function (id, successCallback, errorCallback) {
                var url = backand.options.getUrl(backand.api.chart.config.url + id);
                backand.network.json(url, null, backand.options.verbs.get, successCallback, errorCallback);
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
                backand.network.json(url, data, backand.options.verbs.get, successCallback, errorCallback);

            }
        },
        data: {
            url: apiRoutes.chartDataUrl,
            /* get the data of a specific chart */
            getItem: function (id, successCallback, errorCallback) {
                var url = backand.options.getUrl(backand.api.chart.data.url + id + '?' + backand.utils.getQueryString());
                backand.network.json(url, null, backand.options.verbs.get, successCallback, errorCallback);
            }
        }

    };
    this.content = {
        config: {
            url: apiRoutes.contentConfigData,
            /* get the configuration information of a specific content */
            getItem: function (id, successCallback, errorCallback) {
                var url = backand.options.getUrl(backand.api.content.config.url + id);
                backand.network.json(url, null, backand.options.verbs.get, successCallback, errorCallback);
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
                backand.network.ajax.json(url, data, backand.options.verbs.get, successCallback, errorCallback);

            }
        }
    };

    this.file = {
        url: apiRoutes.fileUrl,
        upload: function (tableName, fieldName, files, successCallback, errorCallback) {

            var url = backand.options.getUrl(backand.api.file.url + tableName + '/' + fieldName);
            var data = new FormData();

            //todo: (for rely) data append expecting a string.
            for (var i = 0; i < files.length; i++) {
                data.append(i, files[i]);
            }

            backand.options.ajax.file(url, data, backand.options.verbs.post, successCallback, errorCallback);
        }
    }
}