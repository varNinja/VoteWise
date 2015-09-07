'use strict';
var servicename = 'Register';

module.exports = function(app) {

    var dependencies = ['$resource'];

    function service($resource) {
        return $resource("/api/register");
    }

    service.$inject = dependencies;

    app.factory(app.name + '.' + servicename, service);
};