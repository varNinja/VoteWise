var express = require('express');
var mysql = require('mysql');
var config = require('./config');
var crypto = require('crypto');
var bodyParser = require('body-parser');
var nacl = require('js-nacl').instantiate();

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

app.post('/api/login', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    db.query('select salt, passwordHash from users where userName = ?',
        [username], function(err, rows, fields) {
        if (err) {
            console.error(err);
            res.status(500).json({
                error: 'Internal server error.'
            });
            return;
        }

        if (rows.length < 1) {
            res.status(404).json({
                error: 'No user with that username exists.'
            });
            return;
        }

        var user = rows[0];

        crypto.pbkdf2(password, user.salt, 2048, 'sha256', function(err, key) {
            if (err) {
                console.error(err);
                res.status(500).json({
                    error: 'Internal server error.'
                });
                return;
            }

            // TODO: .equals?
            if (key !== user.passwordHash) {
                res.status(403).json({
                    error: 'Incorrect password.'
                });
                return;
            }

            // TODO: Auth tokens should probably contain some kind of
            //       expiration?
            var authToken = nacl.crypto_secretbox(
                nacl.encode_utf8(user.id),
                nacl.crypto_secretbox_random_nonce(),
                secretAuthKey
            );

            res.status(200).json({
                token: authToken
            });
        });
    });
});

var server = app.listen(config.port, function() {
    var address = server.address();

    console.log('Example app listening at http://%s:%s',
                address.address, address.port);
});

