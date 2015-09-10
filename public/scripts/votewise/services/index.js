'use strict';

module.exports = function(app) {
    // inject:start
    require('./getTopicTrees.service')(app);
    require('./login.service')(app);
    require('./register.service')(app);
    // inject:end
};