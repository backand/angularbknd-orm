function Backand() {

    this.options = new BackandOptions();
    this.security = new BackandSecurity();
    this.system = new BackandSystem();
    this.api = new BackandApi();
    this.filter = new BackandFilter();
    this.field = new BackandField();
    this.sort = new BackandSort();
    this.table = BackandTable;

    this.loadTables = function () {
        backand.database = [];

        var filterItem = new backand.filter.item("SystemView", backand.filter.operator.boolean.equals, false);
        var filter = [filterItem];

        var sortItem = new backand.sort.item("captionText", backand.sort.order.asc);

        var sort = [sortItem];

        backand.api.table.config.getList(null, null, 1000, filter, sort, null, function (data) {
                for (var i = 0; i < data.data.length; i++) {
                    var name = data.data[i].name;
                    backand.database[name] = new backand.table(name, true);
                    backand.database.push(backand.database[name]);
                }
                backand.database.create = function (data, successCallback, errorCallback) {
                    backand.api.table.config.createItem(JSON.stringify(data), function (data, textStatus, xhr) {
                        backand.database[data.name] = new backand.table(data.name, true);
                        backand.database.push(backand.database[data.name]);
                        if (successCallback) successCallback(data, textStatus, xhr);
                    }, errorCallback);
                };
            },
            function (xhr) {
                alert(JSON.stringify(xhr));
            });
    };
}

var backand = new Backand();