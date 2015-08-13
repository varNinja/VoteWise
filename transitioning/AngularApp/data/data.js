//Waiting to get 'toaster' working -> when working insert toaster after $http and uncomment obj.toast

app.factory("Data", ['$http',
    function ($http) { // This service connects to our REST API
 
        var serviceBase = '/angularcode-authentication-app/api/v1/';
 
        var obj = {};
        // obj.toast = function (data) {
        //     toaster.pop(data.status, "", data.message, 10000, 'trustedHtml');
        // }
        obj.get = function (q) {
            return $http.get(serviceBase + q).then(function (results) {
                return results.data;
            });
        };
        obj.post = function (q, object) {
            return $http.post(serviceBase + q, object).then(function (results) {
                return results.data;
            });
        };
        obj.put = function (q, object) {
            return $http.put(serviceBase + q, object).then(function (results) {
                return results.data;
            });
        };
        obj.delete = function (q) {
            return $http.delete(serviceBase + q).then(function (results) {
                return results.data;
            });
        };
 
        return obj;
}]);