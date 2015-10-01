require('angular-ui-router');

var modulename = 'votewise';

module.exports = function(namespace) {

    var fullname = namespace + '.' + modulename;

    var angular = require('angular');
    var app = angular.module(fullname, ['ui.router', ]);
    // inject:folders start
    require('./controllers')(app);
    // inject:folders end

    var configRoutesDeps = ['$stateProvider', '$urlRouterProvider'];
    var configRoutes = function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');

        $stateProvider.state('home', {
                url: '/home',
                template: require('./views/home.html'),
                controller: 'main.votewise.navigationCtrl'
        });

        $stateProvider.state('comparison', {
                url: '/comparison',
                template: require('./views/comparison.html'),
                controller: 'main.votewise.comparisonCtrl'
        });

        $stateProvider.state('questions', {
                url: '/questions',
                template: require('./views/questions.html'),
                controller: 'main.votewise.questionsCtrl'
        })

        $stateProvider.state('login', {
                url: '/login',
                template: require('./views/login.html'),
                controller: 'main.votewise.userAuthCtrl'
        })

        $stateProvider.state('register', {
                url: '/register',
                template: require('./views/register.html'),
                controller: 'main.votewise.userAuthCtrl'
        })

    };
    configRoutes.$inject = configRoutesDeps;
    app.config(configRoutes);

    return app;
};