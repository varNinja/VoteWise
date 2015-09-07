'use strict';

module.exports = function(app) {
    // inject:start
    require('./login.service')(app);
    require('./register.service')(app);
    // inject:end
};