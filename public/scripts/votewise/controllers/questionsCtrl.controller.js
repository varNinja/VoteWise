var controllername = 'questionsCtrl';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['$scope', '$rootScope'];

    function controller(scope, rootScope) {
        var vm = this;
        vm.controllername = fullname;

        var activate = function() {
        };
        activate();
        console.log("inside questionsCtrl");

    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
