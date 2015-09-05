var controllername = 'userAuthCtrl';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */



    var deps = ['$scope', '$rootScope', '$location', '$http'];

    function controller(scope, rootScope, location, http) {
        var vm = this;
        vm.controllername = fullname;

        console.log(scope);

        var activate = function() {
        };
        activate();

        console.log("inside AuthCtrl");
        scope.login = {};
        scope.signup = {};
        scope.signup = {
            email:undefined,
            password:undefined,
            name:undefined,
            phone:undefined,
            address:undefined
        };

        scope.doLogin = function (customer) {
            console.log("doLogin clicked with email: " + scope.login.email +
             " and password: " + scope.login.password);
        };

        scope.signUp = function (customer) {
            console.log("Signup clicked with parameters: " + 
             JSON.stringify(scope.signup));
        };

        scope.logout = function () {

        };

        scope.setAccountType = function(type){
            console.log("$scope.setAccountType activated");
            console.log(type);
            if (Number(type) == 1){
                $scope.signup.type = 'voter';
                console.log(scope.signup.type);
            } else if (Number(type) == 2){
                $scope.signup.type = 'politician';
                console.log(scope.signup.type);
            } else if (Number(type) == 3){
                $scope.signup.type = "interestGroup"
                console.log(scope.signup.type);
            } else if (Number(type) == 4){
                $scope.signup.type = "media";
                console.log(scope.signup.type);
            }
        }

    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
