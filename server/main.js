var express = require('express'),
    mysql   = require('mysql'),
    config  = require('./config'),
    login   = require('./api/login')

var app = express();


var db = mysql.createPool({
    connectionLimit: config.db.connectionLimit,
    host:            config.db.host,
    user:            config.db.user,
    password:        config.db.password,
    database:        config.db.database,
    port:            config.db.port
});

app.use(express.static('../dist/app/dev'));


app.post('/api/login', function(req, res) {
    console.log("posted at login")
    res.json({
        'msg':'success'
    })
    res.end(console.log("Successfully posted at login"));
});

app.post('/api/register', function(req, res) {
    console.log("posted at register")
    res.json({
        'msg':'success'
    })
    res.end(console.log("Successfully posted at register"));
});

var server = app.listen(config.port, function() {
    var address = server.address();

    console.log('Example app listening at http://%s:%s',
                address.address, address.port);
});

