module.exports = function(app) {
    // inject:start
    require('./comparisonCtrl.controller')(app);
    require('./navigationCtrl.controller')(app);
    require('./questionsCtrl.controller')(app);
    require('./userAuthCtrl.controller')(app);
    // inject:end
};