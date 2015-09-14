var async = require('async');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var express = require('express');

function register(req, res) {
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
}

function login(req, res) {
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
}

function getTopicTree(req, res) {
    console.log("app.get at /getTopicTrees called");
    var topic = req.params.topic;
    console.log("req.params.topic: " + topic);

    async.waterfall([
        function(callback) {
            db.query('select id from topics where description = ?',
                [topic], function(err, rows){
                    callback(err, rows);
                });
        },
        function(rows, callback) {
            var query = rows[0].id
            db.query('select id, background, viewOrder, description from topics where parent = ? order by viewOrder',
                [query], function(err, rows){
                    callback(err, rows);

                });
        },
        function(topics, callback){
            async.forEachOf(topics, function(row, key, callback){
                console.log('rows[key].id: ', topics[key].id);
                if (topics[key].background == 0){
                    var query = topics[key].id
                    db.query('select id, background, viewOrder, description from topics where parent = ? order by viewOrder',
                        [query], function(err, rows){
                            if (err){
                                return callback(err);
                            }
                            topics[key].subTopics = rows;
                            console.log('rows from async.forEach db query: ', rows);
                            console.log("from inside asnyc.foreach", topics);
                            callback();
                            });
                } else {
                    callback();
                }
            }, function(err){
                callback(err, topics);
                console.log('forEachOf callback called');
            });
            // console.log(topics);
        }
    ], function(err, topics){
       console.log("from end of waterfall: ", topics);
       res.status(200).json(
            topics
        );
    });
}

function internalServerError(res, err) {
    console.error(err);
    res.status(500).json({
        message: 'Internal server error'
    });
}

function getTopicTrees(req, res){
    var topic = req.params.topic;

    async.waterfall([
    function(callback) {
        req.db.query('select id from topics where description = ?',
            [topic], function(err, rows){
                callback(err, rows);
            });
    },
    function(rows, callback) {
        var query = rows[0].id
        req.db.query('select id, background, viewOrder, description '+
                     'from topics where parent = ? order by viewOrder',
            [query], function(err, rows){
            callback(err, rows);
        });
    },
    function(topics, callback){
        async.forEachOf(topics, function(row, key, callback){
            if (topics[key].background == 0){
                var query = topics[key].id
                req.db.query('select id, background, viewOrder, description '+
                             'from topics where parent = ? order by viewOrder',
                    [query], function(err, rows){
                        if (err) {
                            return callback(err);
                        }
                        topics[key].subTopics = rows;
                        callback();
                });
            } else {
                callback();
            }
        }, function(err){
            callback(err, topics);
        });
    }
    ], function(err, topics){
        if (err) return internalServerError(res, err);
        res.status(200).json(
            topics
        );
    });
}

function questionsByBackgroundId(req, res){
    var questionSet = req.params.id;
    req.db.query('select description, id from concurrenceQuestions where background = ?',
        [questionSet], function(err, rows){
        if (err) return internalServerError(res, err);

        res.json(rows);
    });
}

module.exports = function(db) {
    var app = express();

    app.use(express.static('../dist/app/dev'));
    app.use(bodyParser.json());
    app.use(function(req, res, next) {
        req.db = db;
        next();
    });

    app.get('/backgrounds/:id/questions', questionsByBackgroundId);
    app.get('/topic-tree/:topic', getTopicTrees);

    return app;
};

