var backand = new Backand({

  options : {
    url: 'https://api.backand.com:8080',
    version: 1
  },

  security : {
    bannerUrl : '/api/banner',
    authUrl : '/token'
  },

  system : {
    systemUrl : '/api/system'
  },

  api : {
    appUrl : '/app/config',
    tableConfigUrl : '/table/config/',
    tableDataUrl : '/table/data/',
    dashboardConfigUrl : '/dashboard/config/',
    dashboardDataUrl : '/dashboard/data/',
    chartConfigUrl : '/chart/config/',
    chartDataUrl : '/chart/data/',
    contentConfigUrl : '/content/config/',
    fileUrl : '/file/upload/'
  }
});

angular.module('bknd.orm', [])

    .value('backand', backand)

    .config(function ($provide) {
          $provide.decorator('backand', function ($delegate, $http) {
            var originalService = $delegate;
            originalService.network = new BackandAngularjsAdaptor($http, $delegate);
            return originalService;
        })
    });


