function BackandSort () {

    this.item = function (fieldName, order) {
        this.fieldName = fieldName;
        this.order = order;
    };

    this.order = {asc: "asc", desc: "desc"}
}