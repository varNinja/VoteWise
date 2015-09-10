var controllername = 'userAuthCtrl';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['$scope', '$rootScope', '$location', '$http', 'main.votewise.Login', 'main.votewise.Register' ];

    function controller(scope, rootScope, location, http, Login, Register) {
        var vm = this;
        vm.controllername = fullname;

        console.log(scope);
        console.log('login works -> ' + Login);

        var activate = function() {
        };
        activate();

        console.log("inside AuthCtrl");
        scope.login = {
            username:undefined,
            password:undefined
        };
        scope.signUp = {
            email:      undefined,
            password:   undefined,
            userName:       undefined,
            password2:  undefined
        };

        var hello = {};

        scope.loginTest = function (){
            console.log("loginTest called");
            
        }

        scope.registerTest = function() {
            console.log("registerTest called");
            
        }

        scope.verifyLoginScope = function (){
            console.log("username " + scope.login.username);
            console.log("password " + scope.login.password);
        }

        scope.verifyRegisterScope = function (){ 
            console.log("Username " + scope.signUp.userName);
            console.log("Email " + scope.signUp.email);
            console.log("Password " + scope.signUp.password);
            console.log("Password2 " + scope.signUp.password2);
        }

        scope.doLogin = function () {
            console.log("doLogin clicked with email: " + scope.login.email +
             " and password: " + scope.login.password);
        };

        // scope.signUp = function (customer) {
        //     console.log("Signup clicked with parameters: " + 
        //      JSON.stringify(scope.signup));
        // };

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
