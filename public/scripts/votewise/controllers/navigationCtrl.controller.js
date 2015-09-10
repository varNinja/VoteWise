var controllername = 'navigationCtrl';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['$scope', '$rootScope', '$state', '$resource'];

    function controller($scope, $rootScope, $state, $resource) {
        var vm = this;
        vm.controllername = fullname;

        var activate = function() {
        };
        activate();

        console.log("inside navigationCtrl");
        $scope.currentPage = undefined; 


        $scope.goToPage = function(page) {

            var params = {topic: page}

            console.log(JSON.stringify(params));

            $resource("/getTopicTree/:topic");
            
            $scope.currentPage = page
            $state.go('topic');
            console.log("current page: " + $scope.currentPage);

        }



    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
