(function () {

  function DemoController (backand) {
    var self = this;
    var outputElement;
    var lastCreatedId;
    var employeesConfig;
    
    self.output = {};
    self.username = 'guest@backand.com';
    self.password = 'guest1234';
    self.appname = 'restdemo';
    
    var setOutput = function (elementClass, elementText) {
      self.output[outputElement].class = elementClass;
      self.output[outputElement].text = elementText;
    };
    
    var successCallback = function (data) {
      var text = data ? JSON.stringify(data) : 'success';
      setOutput('alert-success', text);
    };

    var errorCallback = function (error) {
      var text = 'error';
      if (error) {
        if (error.responseJSON && error.responseJSON.error_description) {
          text = error.responseJSON.error_description;
        } else if (error.responseText) {
          text = error.responseText;
        }
      }
      setOutput('alert-danger', text);
    };

    var authorized = function() {
      if (!backand.database) {
        alert("please login before using backand");
        return false;
      } else {
        return true;
      }
    };
    
    var created = function () {
      if (!lastCreatedId) {
        alert("please create before update");
        return false;
      } else {
        return true;
      }
    };
    
    var tableChosen = function () {
      if (!employeesConfig) {
        alert("please click on specific table config before");
        return false;
      } else {
        return true;
      }
    };
    
    self.login = function () {
      outputElement = 'login';
      backand.security.authentication.login(self.username, self.password, self.appname, successCallback, errorCallback);
    };
    
    // CRUD Create
    self.crudCreate = function () {
      if (authorized()) {
        outputElement = 'crudCreate';
        var employee = { "First_Name": "Nir", "Last_Name": "Kaufman" };
        backand.database.Employees.create(employee, function (data) {
          lastCreatedId = data.__metadata.id;
          successCallback(data);
        }, errorCallback);
      }
    };

    // CRUD Read
    self.crudReadMultiFilter = function () {
      if (authorized()) {
        outputElement = 'crudReadMultiFilter';
        var pageNumber = 1;
        var pageSize = 10;
        var filter = [
          { fieldName: "First_Name", operator: backand.filter.operator.text.startsWith, value: "Nir" },
          { fieldName: "Last_Name", operator: backand.filter.operator.text.contains, value: "k" }
        ];
        var sort = [{ fieldName: "Last_Name", order: "desc" }, { fieldName: "First_Name", order: "desc" }];
        var search = null;
        var deep = true;
        backand.database.Employees.getList(pageNumber, pageSize, filter, sort, search, deep, successCallback, errorCallback);
      }
    };
    
    self.crudReadSingleFilter = function () {
      if (authorized()) {
        outputElement = 'crudReadSingleFilter';
        var pageNumber = 1;
        var pageSize = 10;
        var filter = { fieldName: "First_Name", operator: backand.filter.operator.text.equals, value: "Nir" };
        var sort = { fieldName: "Last_Name", order: "desc" };
        var search = null;
        var deep = true;
        backand.database.Employees.getList(pageNumber, pageSize, filter, sort, search, deep, successCallback, errorCallback);
      }
    };
    
    self.crudReadById = function () {
      if (authorized()) {
        outputElement ='crudReadById';
        backand.database.Employees.get(lastCreatedId ? lastCreatedId : 20, false, successCallback, errorCallback);          
      }
    };
    
    // CRUD Update
    self.crudUpdate = function () {
      if (authorized() && created()) {
        outputElement = 'crudUpdate';
        var employee = { "First_Name": "Nir2", "Last_Name": "Kaufman2" };
        backand.database.Employees.update(lastCreatedId, employee, successCallback, errorCallback);
      }
    };
    
    // CRUD Delete
    self.crudDelete = function () {
      if (authorized() && created()) {
        outputElement = 'crudDelete';
        backand.database.Employees.delete(lastCreatedId, successCallback, errorCallback);
      }
    };

    // Autocomplete
    self.autocomplete = function () {
      if (authorized() && tableChosen()) {
        outputElement = 'autocomplete';

        $('.autocomplete').show();
        $('#autocomplete input').keyup(function () {
          employeesConfig.fields.Job_Title.autoComplete($(this).val(), null, successCallback, errorCallback);
        })
      }
    };
    
    // Select options
    self.selectOptions = function () {
      if (authorized() && tableChosen()) {
        outputElement = 'selectOptions';
        employeesConfig.fields.Job_Title.selectOptions(successCallback, errorCallback);        
      }
    };

    // Upload
    var files = null;
    $('#fileselect').bind("change", function (e) {
      files = e.target.files || e.dataTransfer.files;
    });
    
    self.upload = function () {
      if (authorized() && tableChosen()) {
        outputElement = 'upload';
        employeesConfig.fields.Attachments.upload(files, successCallback, errorCallback)
      }
    };

    // Config
    // List of all database
    self.databaseList = function () {
      if (authorized()) {
        outputElement = 'databaseList';
        successCallback(backand.database);
      }
    };

    // Specific table config
    self.specificTableConfig = function () {
      if (authorized() && tableChosen()) {
        outputElement = 'specificTableConfig';
        backand.database.Employees.config(function (data) {
          employeesConfig = data;
          successCallback(data);
        }, errorCallback);
      }
    };

    // List of all fields
    self.fieldsList = function () {
      if (authorized() && tableChosen()) {
        outputElement = 'fieldsList';
        successCallback(employeesConfig.fields);
      }
    };

    // Specific field config
    self.specificFieldConfig = function () {
      if (authorized() && tableChosen()) {
        outputElement = 'specificFieldConfig';
        successCallback(employeesConfig.fields.First_Name);
      }
    };

    // Schema
    // Create master table
    self.createMasterTable = function () {
      if (authorized()) {
        outputElement = 'createMasterTable';
        var table = { name: "person", fields: [
          { name: "firstName", type: backand.field.type.ShortText },
          { name: "lastName", type: backand.field.type.ShortText },
          { name: "dateOfBirth", type: backand.field.type.DateTime }
        ] };
        backand.database.create(table, successCallback, errorCallback);
      }
    };

    // Create details table
    self.createDetailsTable = function () {
      if (authorized()) {
        outputElement = 'createDetailsTable';
        var table = { name: "pet", fields: [
          { name: "name", type: backand.field.type.ShortText },
          { name: "owner", type: backand.field.type.SingleSelect, relatedTable: "person" },
          { name: "type", type: backand.field.type.SingleSelect, relatedTable: "petType" },
          { name: "dateOfBirth", type: backand.field.type.DateTime }
        ] };
        backand.database.create(table, successCallback, errorCallback);
      }
    };

    // Business rules
    self.businessRule = function () {
      alert("This action is limited to an admin role.");
    };
    
    return self;
  }


  angular.module('angular.orm.demo', ['bknd.orm'])
      .controller('DemoController', DemoController);

}());

