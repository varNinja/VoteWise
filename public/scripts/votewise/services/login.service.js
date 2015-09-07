'use strict';
var servicename = 'Login';

module.exports = function(app) {

    var dependencies = ['$resource'];

    function service($resource) {
        return $resource("/api/login");
    }

    service.$inject = dependencies;

    app.factory(app.name + '.' + servicename, service);
};2