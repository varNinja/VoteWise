'use strict';
var servicename = 'Login';

module.exports = function(app) {

    var dependencies = ['$resource'];

    function service($resource) {
        return $resource("/login");
    }

    service.$inject = dependencies;

    app.factory(app.name + '.' + servicename, service);
};