var express = require('express');
var mysql = require('mysql');
var config = require('./config');
var bodyParser = require('body-parser');

var app = express();

var db = mysql.createPool({
    connectionLimit: config.db.connectionLimit,
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
});

app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/api/register', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    auth.newPassword(password, function(err, passwordHash, salt) {
        if (err) {
            console.error(err);
            return res.status(500).json({
                error: 'Internal server error.'
            });
        }

        db.query('insert into users (userName, salt, passwordHash)',
                 [username, salt, key], function(err) {
            // TODO: Check for integrity error to return a Conflict status (user
            // already exists)
            if (err) {
                console.error(err);
                return res.status(500).json({
                    error: 'Internal server error.'
                });
            }

            res.status(200).json({});
    });
});

app.post('/api/login', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    db.query('select salt, passwordHash from users where userName = ?',
        [username], function(err, rows, fields) {
        if (err) {
            console.error(err);
            return res.status(500).json({
                error: 'Internal server error.'
            });
        }

        if (rows.length < 1) {
            return res.status(404).json({
                error: 'No user with that username exists.'
            });
        }

        var user = rows[0];

        checkPassword(password, user.passwordHash, user.salt, function(err, ok) {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    error: 'Internal server error.'
                });
            }

            if (!ok) {
                return res.status(403).json({
                    error: 'Incorrect password.'
                });
            }

            res.status(200).json({
                token: createToken({id: user.id})
            });
        });
    });
});

var server = app.listen(config.port, function() {
    var address = server.address();

    console.log('Example app listening at http://%s:%s',
                address.address, address.port);
});

