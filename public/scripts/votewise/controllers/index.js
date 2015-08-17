module.exports = function(app) {
    // inject:start
    require('./comparisonCtrl.controller.js')(app);
    require('./navigationCtrl.controller.js')(app);
    require('./questionsCtrl.controller')(app);
    require('./userAuthCtrl.controller')(app);
    // inject:end
};