'use strict';
var servicename = 'GetTopicTrees';

module.exports = function(app) {

    var dependencies = ['$resource', '$rootScope'];

    function service($resource, $rootScope) {
        console.log("console statement inside GetTopicTrees service called.");
        var params = {topic: $rootScope.topicTree}
        console.log("GetTopicTrees params are: " + params);
        return $resource("/getTopicTree/:topic", params);
    }

    service.$inject = dependencies;

    app.factory(app.name + '.' + servicename, service);
};