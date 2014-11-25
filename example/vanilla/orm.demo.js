$(function () {

	// init backand url
	backand.options.url = "https://api.backand.com:8080";

	var outputElement = null;

	var successCallback = function (data) {
	    outputElement.text('');
		outputElement.removeClass('alert-danger')
		outputElement.addClass('alert-success')
		if (data)
			outputElement.text(JSON.stringify(data));
		else
			outputElement.text("success");
	};
	var errorCallback = function (error) {
	    outputElement.text('');
	    outputElement.removeClass('alert-success')
		outputElement.addClass('alert-danger')
		if (error) {
			if (error.responseJSON && error.responseJSON.error_description) {
				outputElement.text(error.responseJSON.error_description);
			}
			else if (error.responseText) {
				outputElement.text(error.responseText);

			}
			else {
				outputElement.text("error");
			}
		}
		else {
			outputElement.text("error");
		}
	}

	var lastCreatedId = null;

	// LOGIN
	$('#oauth2 button').click(function () {
		outputElement = $('#oauth2 .output');

		var username = $('input[name=username]').val();
		var password = $('input[name=password]').val();
		var appname = $('input[name=appname]').val();

		backand.security.authentication.login(username, password, appname, successCallback, errorCallback);
	});
	

	//CRUD
	//CRUD-READ
	$('#crud #readMultiFilter button').click(function () {
		if (!backand.database) {
			alert("please login before using backand");
			return;
		}
			

		outputElement = $(this).parents('.row:first').find('.output');

		var pageNumber = 1;
		var pageSize = 10;
		var filter = [{ fieldName: "First_Name", operator: backand.filter.operator.text.startsWith, value: "Nir" }, { fieldName: "Last_Name", operator: backand.filter.operator.text.contains, value: "k" }];
		var sort = [{ fieldName: "Last_Name", order: "desc" }, { fieldName: "First_Name", order: "desc" }];
		var search = null;
		var deep = true;

		backand.database.Employees.getList(pageNumber, pageSize, filter, sort, search, deep, successCallback, errorCallback);
	});
	$('#crud #readSingleFilter button').click(function () {
	    if (!backand.database) {
	        alert("please login before using backand");
	        return;
	    }


	    outputElement = $(this).parents('.row:first').find('.output');

	    var pageNumber = 1;
	    var pageSize = 10;
	    var filter = { fieldName: "First_Name", operator: backand.filter.operator.text.equals, value: "Nir" };
	    var sort = { fieldName: "Last_Name", order: "desc" };
	    var search = null;
	    var deep = true;

	    backand.database.Employees.getList(pageNumber, pageSize, filter, sort, search, deep, successCallback, errorCallback);
	});

	$('#crud #readById button').click(function () {
	    if (!backand.database) {
	        alert("please login before using backand");
	        return;
	    }


	    outputElement = $(this).parents('.row:first').find('.output');

	    
	    backand.database.Employees.get(lastCreatedId ? lastCreatedId : 20, false, successCallback, errorCallback);
	});

	//CRUD-READ
	$('#crud #create button').click(function () {
		if (!backand.database) {
			alert("please login before using backand");
			return;
		}

		outputElement = $(this).parents('.row:first').find('.output');

		var employee = { "First_Name": "Nir", "Last_Name": "Kaufman" };

		backand.database.Employees.create(employee, function (data) {
			lastCreatedId = data.__metadata.id;
			successCallback(data);
		}, errorCallback);
	});

	//CRUD-UPDATE
	$('#crud #update button').click(function () {
		if (!backand.database) {
			alert("please login before using backand");
			return;
		}
		if (!lastCreatedId) {
			alert("please create before update");
			return;
		}


		outputElement = $(this).parents('.row:first').find('.output');

		var id = lastCreatedId;
		var employee = { "First_Name": "Nir2", "Last_Name": "Kaufman2" };

		backand.database.Employees.update(id, employee, successCallback, errorCallback);
	});

	//CRUD-DELETE
	$('#crud #delete button').click(function () {
		if (!backand.database) {
			alert("please login before using backand");
			return;
		}
		if (!lastCreatedId) {
			alert("please create before delete");
			return;
		}


		outputElement = $(this).parents('.row:first').find('.output');

		var id = lastCreatedId;
		
		backand.database.Employees.delete(id, successCallback, errorCallback);
	});

	//autocomplete
	$('#autocomplete button').click(function () {
		if (!backand.database) {
			alert("please login before using backand");
			return;
		}
		
		outputElement = $(this).parents('.row:first').find('.output');

		if (!employeesConfig) {
			alert("please click on specific table config before");
			return;
		}

		$('.autocomplete').show();

		$('#autocomplete input').keyup(function () {
			employeesConfig.fields.Job_Title.autoComplete($(this).val(), null, successCallback, errorCallback);
		})
	});

    //select options
	$('#options button').click(function () {
	    if (!backand.database) {
	        alert("please login before using backand");
	        return;
	    }

	    outputElement = $(this).parents('.row:first').find('.output');

	    if (!employeesConfig) {
	        alert("please click on specific table config before");
	        return;
	    }
	    employeesConfig.fields.Job_Title.selectOptions(successCallback, errorCallback);

	});

    //upload
	var files = null;
	$('#fileselect').bind("change", function (e) {
	    files = e.target.files || e.dataTransfer.files;
	});

	$('#uploadbutton').click(function () {
	    if (!backand.database) {
	        alert("please login before using backand");
	        return;
	    }

	    outputElement = $(this).parents('.row:first').find('.output');

	    if (!employeesConfig) {
	        alert("please click on specific table config before");
	        return;
	    }

	    employeesConfig.fields.Attachments.upload(files, successCallback, errorCallback)

	});


	//CONFIG
	//VIEWS LIST
	$('#config #database button').click(function () {
		if (!backand.database) {
			alert("please login before using backand");
			return;
		}
		
		outputElement = $(this).parents('.row:first').find('.output');

		successCallback(backand.database);
	});

	var employeesConfig = null;

	//SPECIFIC VIEW CONFIG
	$('#config #table button').click(function () {
		if (!backand.database) {
			alert("please login before using backand");
			return;
		}

		outputElement = $(this).parents('.row:first').find('.output');

		backand.database.Employees.config(function (data) {
			employeesConfig = data;
			successCallback(data);
		}, errorCallback);
	});

	//VIEW FIELDS IST
	$('#config #fields button').click(function () {
		if (!backand.database) {
			alert("please login before using backand");
			return;
		}

		if (!employeesConfig) {
			alert("please click on specific table config before");
			return;
		}

		outputElement = $(this).parents('.row:first').find('.output');

		successCallback(employeesConfig.fields);
	});

	//SPECIFIC FIELD CONFIG
	$('#config #field button').click(function () {
		if (!backand.database) {
			alert("please login before using backand");
			return;
		}

		if (!employeesConfig) {
			alert("please click on specific view config before");
			return;
		}

		outputElement = $(this).parents('.row:first').find('.output');

		successCallback(employeesConfig.fields.First_Name);
	});

	//SCHEMA
	//CREATE MASTER TABLE
	$('#schema #createMasterTable button').click(function () {
	    if (!backand.database) {
	        alert("please login before using backand");
	        return;
	    }

	    outputElement = $(this).parents('.row:first').find('.output');

	    var table = { name: "person", fields: [{ name: "firstName", type: backand.field.type.ShortText }, { name: "lastName", type: backand.field.type.ShortText }, { name: "dateOfBirth", type: backand.field.type.DateTime }] };
	    backand.database.create(table, successCallback, errorCallback);

	});

    //CREATE DETAILS TABLE
	$('#schema #createDetailsTable button').click(function () {
	    if (!backand.database) {
	        alert("please login before using backand");
	        return;
	    }

	    outputElement = $(this).parents('.row:first').find('.output');

	    var table = { name: "pet", fields: [{ name: "name", type: backand.field.type.ShortText }, { name: "owner", type: backand.field.type.SingleSelect, relatedTable: "person" }, { name: "type", type: backand.field.type.SingleSelect, relatedTable: "petType" }, { name: "dateOfBirth", type: backand.field.type.DateTime }] };
	    backand.database.create(table, successCallback, errorCallback);

	});

	
	//BUSINESS RULES
	$('#bl button').click(function () {
		alert("This action is limited to an admin role.");
	});

})