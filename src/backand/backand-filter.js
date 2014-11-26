function BackandFilter () {

    this.item = function (fieldName, operator, value) {
        this.fieldName = fieldName;
        this.operator = operator;
        this.value = value;
    };

    this.operator = {
        numeric: {
            equals: "equals",
                notEquals: "notEquals",
                greaterThan: "greaterThan",
                greaterThanOrEqualsTo: "greaterThanOrEqualsTo",
                lessThan: "lessThan",
                lessThanOrEqualsTo: "lessThanOrEqualsTo",
                empty: "empty",
                notEmpty: "notEmpty"
        },
        date: {
            equals: "equals",
                notEquals: "notEquals",
                greaterThan: "greaterThan",
                greaterThanOrEqualsTo: "greaterThanOrEqualsTo",
                lessThan: "lessThan",
                lessThanOrEqualsTo: "lessThanOrEqualsTo",
                empty: "empty",
                notEmpty: "notEmpty"
        },
        text: {
            equals: "equals",
                notEquals: "notEquals",
                startsWith: "startsWith",
                endsWith: "endsWith",
                contains: "contains",
                notContains: "notContains",
                empty: "empty",
                notEmpty: "notEmpty"
        },
        boolean: {equals: "equals"},
        relation: {in: "in"}
    }
}