function BackandNetwork (networkLibrary) {

    var self = this;

    switch(networkLibrary) {
        case 'jquery':
            self.ajax = new BackandJqueryAdaptor();
            break;
        case 'angular':
            self.ajax = new BackandAngularjsAdaptor();
            break;
        default:
            throw Error('network library not defined');
    }

}