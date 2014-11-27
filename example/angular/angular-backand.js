angular.module('bknd.orm', [])

    .value('backand', backand)

    .config(function ($provide) {

        $provide.decorator('backand', function ($delegate, $http) {
            $delegate.network = new BackandAngularjsAdaptor($http, $delegate);
            return $delegate;
        })
    });


