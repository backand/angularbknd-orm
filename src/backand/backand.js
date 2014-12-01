function Backand(config) {

    var self = this;

    self.options = new BackandOptions(config.options.url, config.options.version);
    self.security = new BackandSecurity(config.security.bannerUrl, config.security.authUrl);
    self.system = new BackandSystem(config.system.systemUrl);
    self.api = new BackandApi(config.api);
    self.filter = new BackandFilter();
    self.field = new BackandField();
    self.sort = new BackandSort();
    self.utils = new BackandUtils();
    self.network = new BackandNetwork();
    self.table = BackandTable;

    self.loadTables = function () {

        backand.database = [];

        var filterItem = new self.filter.item("SystemView", self.filter.operator.boolean.equals, false);
        //todo: (relly) does it need to be an array?
        // yes, you need to pass it as an array to the rest, but enable a single object as well see in the original 413-416
        var filter = [filterItem];

        var sortItem = new self.sort.item("captionText", self.sort.order.asc);

        //todo: (relly) does it need to be an array?
        // yes, you need to pass it as an array to the rest, but enable a single object as well see in the original 413-416
        var sort = [sortItem];

        // get a list of all the tables in the database
        self.api.table.config.getList(null, null, 1000, filter, sort, null, function (data) {

                for (var i = 0; i < data.data.length; i++) {

                    var name = data.data[i].name;
                    
                    // database will now have both a collection to itherate and a hash for all tables by name
                    backand.database[name] = new self.table(name, true); // hash
                    backand.database.push(backand.database[name]); // collection
                }

                // todo: (relly) overriding Object.create method. choose another name.
                // create -> add
                // create new table
                backand.database.create = function (data, successCallback, errorCallback) {
                    // call the rest api create in configuration 
                    self.api.table.config.createItem(JSON.stringify(data), function (data, textStatus, xhr) {
                        // add the new table to the hash and array
                        backand.database[data.name] = new self.table(data.name, true);
                        backand.database.push(backand.database[data.name]);
                        
                        // call the success callback
                        if (successCallback) successCallback(data, textStatus, xhr);

                    }, errorCallback);
                };
            },

            function (xhr) {
                console.log(JSON.stringify(xhr));
            });
    };
}

