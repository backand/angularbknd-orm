function BackandSecurity (bannerUrl, authUrl ) {

    this.banner = {
        url: bannerUrl,
            getAdminInfo: function () {
            var adminInfo = null;
            backand.network.json(backand.options.url + backand.security.banner.url, null, backand.options.verbs.post, function (data) {
                adminInfo = data;
            }, function (xhr, textStatus, err) {
                if (xhr) {
                    if (xhr.responseJSON) {
                        if (xhr.responseJSON.error_description) {
                            console.error("ERROR: " + xhr.responseJSON.error_description)
                        }
                        else {
                            if (err) {
                                console.error("ERROR: " + JSON.stringify(err));
                            }
                            else {
                                console.error("ERROR: Failed to getAdminInfo");
                            }
                        }
                    }
                    else {
                        console.error("ERROR: " + JSON.stringify(xhr));
                    }
                }
                else {
                    if (err) {
                        console.error("ERROR: " + JSON.stringify(err));
                    }
                    else {
                        console.error("ERROR: Failed to getAdminInfo");
                    }
                }
            });
            return adminInfo;
        }

    };

    this.authentication = {
        url: authUrl,
            token: null,
            onlogin: null,
            addLoginEvent: function (appname) {
            if (backand.security.authentication.onlogin != null) return;
            // Create the event
            if (window.navigator.userAgent.indexOf("MSIE ") > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
                backand.security.authentication.onlogin = document.createEvent("CustomEvent");
                backand.security.authentication.onlogin.initCustomEvent('onlogin', false, false, {"appname": appname});
            }
            else {
                backand.security.authentication.onlogin = new CustomEvent("onlogin", {"appname": appname});
            }
        },
        login: function (username, password, appname, successCallback, errorCallback) {
            backand.security.authentication.addLoginEvent();
            backand.network.json(backand.options.url + backand.security.authentication.url, {
                    grant_type: "password",
                    username: username,
                    password: password,
                    appname: appname
                }, backand.options.verbs.post, function (data) {
                    backand.security.authentication.token = data.token_type + " " + data.access_token;
                    document.dispatchEvent(backand.security.authentication.onlogin);
                    backand.loadTables();
                    if (successCallback) successCallback(data);
                },
                function (xhr, textStatus, err) {
                    if (errorCallback && xhr) errorCallback(xhr, textStatus, err)
                },
                true);
        }
    };

    this.unlock = function (username, successCallback, errorCallback) {
        var url = backand.options.getUrl('/account/unlock');
        backand.network.json(url, JSON.stringify({username: username}), backand.options.verbs.post, successCallback, errorCallback);

    }
}