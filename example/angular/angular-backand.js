angular.module('bknd.orm', [])

    .value('backand', backand)

    .config(function ($provide) {

        $provide.decorator('backand', function ($delegate, $http) {
            var originalService = $delegate;
            originalService.network = new BackandAngularjsAdaptor($http, $delegate);
            return originalService;
        })
    });


