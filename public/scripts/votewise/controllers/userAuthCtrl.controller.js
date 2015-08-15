'use strict';
var controllername = 'userAuthCtrl';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */


    //
    // Before, it was using $routeParams. 
    // Now, in index.js for the votewise module, its $stateParams. 
    // How is this going to effect the dependencies? 
    // How does this effect the system?
    // Where do the controllers come into play?
    //
    var deps = [$scope, $rootScope, $location, $http];
    //  --> this is now apparently deprecated: $routeParams


    function controller() {
        var vm = this;
        vm.controllername = fullname;

        var activate = function() {

            console.log("inside AuthCtrl");
            $scope.login = {};
            $scope.signup = {};
            $scope.signup = {
                email:undefined,
                password:undefined,
                name:undefined,
                phone:undefined,
                address:undefined
            };

        };
        activate();

        $scope.doLogin = function (customer) {
            console.log("doLogin clicked with email: " + $scope.login.email +
             " and password: " + $scope.login.password);
        };

        $scope.signUp = function (customer) {
            console.log("Signup clicked with parameters: " + 
             JSON.stringify($scope.signup));
        };

        $scope.logout = function () {

        };

        $scope.setAccountType = function(type){
            console.log("$scope.setAccountType activated");
            console.log(type);
            if (Number(type) == 1){
                $scope.signup.type = 'voter';
                console.log($scope.signup.type);
            } else if (Number(type) == 2){
                $scope.signup.type = 'politician';
                console.log($scope.signup.type);
            } else if (Number(type) == 3){
                $scope.signup.type = "interestGroup"
                console.log($scope.signup.type);
            } else if (Number(type) == 4){
                $scope.signup.type = "media";
                console.log($scope.signup.type);
            }
        }

    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
