'use strict';
var servicename = 'Register';

module.exports = function(app) {

    var dependencies = ['$resource'];

    function service($resource) {
    	console.log("Register service called")
        return $resource("/api/register");
    }

    service.$inject = dependencies;

    app.factory(app.name + '.' + servicename, service);
};