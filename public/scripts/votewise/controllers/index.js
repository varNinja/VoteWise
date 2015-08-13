'use strict';

module.exports = function(app) {
    // inject:start
    require('./comparisonCtrl.controller')(app);
    // inject:end
};