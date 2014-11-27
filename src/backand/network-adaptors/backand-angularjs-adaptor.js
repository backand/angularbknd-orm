function BackandAngularjsAdaptor ($http, backand) {

    this.json = function (url, data, verb) {

        return $http({
            url: url,
            method: verb,
            data: data,
            cache: false,
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : backand.security.authentication.token
            }
        }).then(
            function success(result) {
                return result;
            },
            function error(error) {
                console.log(error);
            }
        )
    }
}
