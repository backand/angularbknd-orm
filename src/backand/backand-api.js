function BackandApi(apiRoutes) {

    /* app is the object the contains the information of all the general content of the app */
    this.app = {
        url: apiRoutes.appUrl,
        getConfig: function () {
            var url = backand.options.getUrl(backand.api.app.url);
            return backand.network.json(url, null, backand.options.verbs.get);
        }
    };

    /* table is the object the contains the information about a database table or table */
    this.table = {
        config: {

            url: apiRoutes.tableConfigUrl,

            getItem: function (name) {
                var url = backand.options.getUrl(backand.api.table.config.url + name);
                return backand.network.json(url, null, backand.options.verbs.get);
            },
            getList: function (withSelectOptions, pageNumber, pageSize, filter, sort, search) {
                var url = backand.options.getUrl(backand.api.table.config.url);
                var data = {
                    withSelectOptions: withSelectOptions,
                    pageNumber: pageNumber,
                    pageSize: pageSize,
                    filter: JSON.stringify(filter),
                    sort: JSON.stringify(sort),
                    search: search
                };
                return backand.network.json(url, data, backand.options.verbs.get);

            },
            createItem: function (data) {
                var url = backand.options.getUrl(backand.api.table.config.url);
                return backand.network.json(url, data, backand.options.verbs.post);
            },
            updateItem: function (name, data) {
                var url = backand.options.getUrl(backand.api.table.config.url + name);
                return backand.network.json(url, data, backand.options.verbs.put);
            },
            deleteItem: function (name) {
                var url = backand.options.getUrl(backand.api.table.config.url + name);
                return backand.network.json(url, null, backand.options.verbs.delete);
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
            getItem: function (name, id, deep) {
                var url = backand.options.getUrl(backand.api.table.data.url + name + '/' + id);
                var data = {deep: deep};
                return backand.network.json(url, data, backand.options.verbs.get);
            },
            /* get a list of rows with optional filter, sort and page */
            getList: function (name, withSelectOptions, withFilterOptions, pageNumber, pageSize, filter, sort, search, deep) {
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
                return backand.network.json(url, data, backand.options.verbs.get);

            },
            createItem: function (name, data, params) {
                var url = backand.options.getUrl(backand.api.table.data.url + name);
                if (params)
                    url += '?' + backand.utils.objectToQueryString(params);
                return backand.network.json(url, data, backand.options.verbs.post);
            },
            updateItem: function (name, id, data, params) {
                var url = backand.options.getUrl(backand.api.table.data.url + name + '/' + id);
                if (params)
                    url += '?' + backand.utils.objectToQueryString(params);
                return backand.network.json(url, data, backand.options.verbs.put);
            },
            deleteItem: function (name, id) {
                var url = backand.options.getUrl(backand.api.table.data.url + name + '/' + id);
                return backand.network.json(url, null, backand.options.verbs.delete);
            },
            autoComplete: function (tableName, fieldName, data) {
                var url = backand.options.getUrl(backand.api.table.data.url + "autocomplete/" + tableName + '/' + fieldName);
                return backand.network.json(url, data, backand.options.verbs.get);
            },
            selectOptions: function (tableName, fieldName) {
                var url = backand.options.getUrl(backand.api.table.data.url + "selectOptions/" + tableName + '/' + fieldName);
                return backand.network.json(url, null, backand.options.verbs.get);
            }
        }

    };

    /* dashboard is a collection of charts */
    this.dashboard = {
        config: {
            url: apiRoutes.dashboardConfigUrl,
            /* get the configuration information of a specific dashboard */
            getItem: function (id) {
                var url = backand.options.getUrl(backand.api.dashboard.config.url + id);
                return backand.network.json(url, null, backand.options.verbs.get);
            },
            getList: function (withSelectOptions, pageNumber, pageSize, filter, sort, search) {
                var url = backand.options.getUrl(backand.api.dashboard.config.url);
                var data = {
                    withSelectOptions: withSelectOptions,
                    pageNumber: pageNumber,
                    pageSize: pageSize,
                    filter: JSON.stringify(filter),
                    sort: JSON.stringify(sort),
                    search: search
                };
                return backand.network.json(url, data, backand.options.verbs.get);

            }
        },

        /* get the data of all the charts in this dashboard */
        data: {
            url: apiRoutes.dashboardDataUrl,
            getItem: function (id) {
                var url = backand.options.getUrl(backand.api.dashboard.data.url + id);
                return backand.network.json(url, null, backand.options.verbs.get);
            }
        }

    };
    this.chart = {
        config: {
            url: apiRoutes.chartConfigUrl,
            /* get the configuration information of a specific chart */
            getItem: function (id) {
                var url = backand.options.getUrl(backand.api.chart.config.url + id);
                return backand.network.json(url, null, backand.options.verbs.get);
            },
            getList: function (withSelectOptions, pageNumber, pageSize, filter, sort, search) {
                var url = backand.options.getUrl(backand.api.chart.config.url);
                var data = {
                    withSelectOptions: withSelectOptions,
                    pageNumber: pageNumber,
                    pageSize: pageSize,
                    filter: JSON.stringify(filter),
                    sort: JSON.stringify(sort),
                    search: search
                };
                return backand.network.json(url, data, backand.options.verbs.get);

            }
        },
        data: {
            url: apiRoutes.chartDataUrl,
            /* get the data of a specific chart */
            getItem: function (id) {
                var url = backand.options.getUrl(backand.api.chart.data.url + id + '?' + backand.utils.getQueryString());
                return backand.network.json(url, null, backand.options.verbs.get);
            }
        }

    };
    this.content = {
        config: {
            url: apiRoutes.contentConfigData,
            /* get the configuration information of a specific content */
            getItem: function (id) {
                var url = backand.options.getUrl(backand.api.content.config.url + id);
                return backand.network.json(url, null, backand.options.verbs.get);
            },
            getList: function (withSelectOptions, pageNumber, pageSize, filter, sort, search) {
                var url = backand.options.getUrl(backand.api.content.config.url);
                var data = {
                    withSelectOptions: withSelectOptions,
                    pageNumber: pageNumber,
                    pageSize: pageSize,
                    filter: JSON.stringify(filter),
                    sort: JSON.stringify(sort),
                    search: search
                };
                return backand.network.ajax.json(url, data, backand.options.verbs.get);

            }
        }
    };

    this.file = {
        url: apiRoutes.fileUrl,
        upload: function (tableName, fieldName, files) {

            var url = backand.options.getUrl(backand.api.file.url + tableName + '/' + fieldName);
            var data = new FormData();

            //todo: (for rely) data append expecting a string.
            for (var i = 0; i < files.length; i++) {
                data.append(i, files[i]);
            }

            return backand.options.ajax.file(url, data, backand.options.verbs.post);
        }
    }
}