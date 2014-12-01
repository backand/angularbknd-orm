function BackandAngularjsAdaptor ($http, backand) {

    this.json = function (url, data, verb) {
        var headers = {
          'Content-Type': 'application/x-www-form-urlencoded'
        };
      
        if (url.match('/token')) {
           data = $.param(data);
        } else {
           headers['Authorization'] = backand.security.authentication.token;
        }
      
        return $http({
            url: url,
            method: verb,
            data: data,
            cache: false,
            headers: headers
        }).then(
            function success(result) {
                return result.data;
            },
            function error(error) {
                console.log(error);
            }
        )
    }
}