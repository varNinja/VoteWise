describe('passwordMatch Directive - ', function() {
    
    var scope, $compile, $window, element, html;
       
    beforeEach(function() {
      module('myApp');
      inject(function(_$compile_, _$rootScope_, _$window_) {
        $compile = _$compile_;
        scope = _$rootScope_.$new();
        $window = _$window_;
        scope.signup = {};
        html =  '<form name="signupForm">' +
          '<input type="password" class="register" name="password" placeholder="Password" ng-model="signup.password" required/>' +
          '<input type="password" class="register" name="password2" placeholder="Confirm Password" ng-model="signup.password2" password-match="signup.password" required/>' +
          '</form>';  
      })
    })

    it('should indicate invalid when the passwords do not match.', function() {
        scope.signup.password = '123';
        scope.signup.password2 = '1234';
        element = $compile(angular.element(html))(scope);
        scope.$apply();
        console.debug('element html - ' + element.html());
        expect(element.html().indexOf('ng-invalid')).toBeGreaterThan(0);
    });

    it('should indicate valid when the passwords match.', function() {
        scope.signup.password = '123';
        scope.signup.password2 = '123';
        element = $compile(angular.element(html))(scope);
        scope.$apply();
        console.debug('element html - ' + element.html());
        expect(element.html().indexOf('ng-valid')).toBeGreaterThan(0);
    });
});

describe('jobsEconomy controller ', function() {

    var $rootScope, $scope, $controller;

    beforeEach(function(){
        module("myApp");
        inject(function(_$rootScope_, _$controller_){
            $rootScope = _$rootScope_;
            $scope = $rootScope.$new();
            $controller = _$controller_;

            $controller('JobsEconomyCtrl', {'$rootScope' : $rootScope, '$scope': $scope});
        });

    });

    it('should make about menu item active.', function() {
        expect($scope.title).toBe("Jobs and Economy");
    });

    it('should show title.', function() {
        expect($scope.talkingPointsImage).toBe('img/JOBS-ECONOMY.svg');
    });

    it('should have correct page title.', function() {
        expect($scope.subCategories.length).toEqual(3);
    });

});


describe('InternationalRelationsCtrl ', function() {

    var $rootScope, $scope, $controller;

    beforeEach(function(){
        module("myApp");
        inject(function(_$rootScope_, _$controller_){
            $rootScope = _$rootScope_;
            $scope = $rootScope.$new();
            $controller = _$controller_;

            $controller('InternationalRelationsCtrl', {'$rootScope' : $rootScope, '$scope': $scope});
        });

    });

    it('should make about menu item active.', function() {
        expect($scope.title).toBe("International Relations");
    });

    it('should show title.', function() {
        expect($scope.talkingPointsImage).toBe('img/INTERNATIONAL-REL.svg');
    });

    it('should have correct page title.', function() {
        expect($scope.subCategories.length).toEqual(4);
    });

});

describe('Testing Routes', function () {

    beforeEach(function(){
        module('myApp');
        inject(function(_$route_){
            $route = _$route_;
        });
    });

    it('should test routes', function() {

        expect($route.routes['/home'].controller).toBe('NavigatorCtrl');
        expect($route.routes['/home'].templateUrl).toEqual('issueViews/home.html');

        expect($route.routes['/login'].controller).toBe('AuthCtrl');
        expect($route.routes['/login'].templateUrl).toEqual('loginRegister/login.html');

        expect($route.routes['/register'].controller).toBe('AuthCtrl');
        expect($route.routes['/register'].templateUrl).toEqual('loginRegister/register.html');

        expect($route.routes['/civilLiberties'].controller).toBe('CivilLibertiesCtrl');
        expect($route.routes['/civilLiberties'].templateUrl).toEqual('issueViews/category.html');

        expect($route.routes['/crimeAndPunishment'].controller).toBe('CrimeAndPunishmentCtrl');
        expect($route.routes['/crimeAndPunishment'].templateUrl).toEqual('issueViews/category.html');

        expect($route.routes['/education'].controller).toBe('EducationCtrl');
        expect($route.routes['/education'].templateUrl).toEqual('issueViews/category.html');

        expect($route.routes['/energy'].controller).toBe('EnergyCtrl');
        expect($route.routes['/energy'].templateUrl).toEqual('issueViews/category.html');

        expect($route.routes['/environment'].controller).toBe('EnvironmentCtrl');
        expect($route.routes['/environment'].templateUrl).toEqual('issueViews/category.html');

        expect($route.routes['/gunControl'].controller).toBe('GunControlCtrl');
        expect($route.routes['/gunControl'].templateUrl).toEqual('issueViews/category.html');

        expect($route.routes['/immigration'].controller).toBe('ImmigrationCtrl');
        expect($route.routes['/immigration'].templateUrl).toEqual('issueViews/category.html');

        expect($route.routes['/infrastructure'].controller).toBe('InfrastructureCtrl');
        expect($route.routes['/infrastructure'].templateUrl).toEqual('issueViews/category.html');

        expect($route.routes['/internationalRelations'].controller).toBe('InternationalRelationsCtrl');
        expect($route.routes['/internationalRelations'].templateUrl).toEqual('issueViews/category.html');

        expect($route.routes['/jobsEconomy'].controller).toBe('JobsEconomyCtrl');
        expect($route.routes['/jobsEconomy'].templateUrl).toEqual('issueViews/category.html');

        expect($route.routes['/qualityOfLife'].controller).toBe('QualityOfLifeCtrl');
        expect($route.routes['/qualityOfLife'].templateUrl).toEqual('issueViews/category.html');

        expect($route.routes['/reproduction'].controller).toBe('ReproductionCtrl');
        expect($route.routes['/reproduction'].templateUrl).toEqual('issueViews/category.html');

        expect($route.routes['/taxes'].controller).toBe('TaxesCtrl');
        expect($route.routes['/taxes'].templateUrl).toEqual('issueViews/category.html');

        expect($route.routes['/socialServices'].controller).toBe('SocialServicesCtrl');
        expect($route.routes['/socialServices'].templateUrl).toEqual('issueViews/category.html');

        expect($route.routes['/questions'].controller).toBe('QuestionsCtrl');
        expect($route.routes['/questions'].templateUrl).toEqual('issueViews/questions.html');

        expect($route.routes[null].redirectTo).toEqual('/home');
    });

});