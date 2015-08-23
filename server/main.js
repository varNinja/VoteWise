var express = require('express'),
    mysql   = require('mysql'),
    config  = require('./config');

var app = express();

var db = mysql.createPool({
    connectionLimit: 10,
    host:            config.db.host,
    user:            config.db.user,
    password:        config.db.password,
    database:        config.db.database
});

app.get('/', function(req, res) {
    db.query('select email from user where userid = 1',
        function(err, rows, fields) {
        if (err) console.error(err);

        res.end('email = ' + rows[0].email);
    });
});

var server = app.listen(8080, function() {
    var address = server.address();

    console.log('Example app listening at http://%s:%s',
                address.address, address.port);
});

