var controllername = 'navigationCtrl';

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
    var deps = [];
    //  --> this is now apparently deprecated: $routeParams


    function controller($scope, $rootScope) {
        var vm = this;
        vm.controllername = fullname;

        var activate = function() {
        };
        activate();

        console.log("inside navigationCtrl");

    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
