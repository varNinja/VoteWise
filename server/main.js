var config = require('./config');
var makeAPI = require('./api');
var mysql = require('mysql');


var db = mysql.createPool({
    connectionLimit: config.db.connectionLimit,
    host:            config.db.host,
    user:            config.db.user,
    password:        config.db.password,
    database:        config.db.database,
    port:            config.db.port
});

var server = makeAPI(db).listen(config.port, function() {

    var address = server.address();

    console.log('Example app listening at http://%s:%s',
                address.address, address.port);
});