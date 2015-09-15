var async = require('async');
var bodyParser = require('body-parser');
var express = require('express');
var auth = require('./auth');

function internalServerError(res, err) {
    console.error(err);
    res.status(500).json({
        message: 'Internal server error'
    });
}

function register(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    auth.newPassword(password, function(err, hashed) {
        if (err) return internalServerError(res, err);

        req.db.query('insert into users (userName, passwordHash) values (?, ?)',
                 [username, hashed], function(err) {
            if (err) {
                if (err.errno == 1062) {
                    res.status(409).json({
                        message: 'A user with that username already exists.'
                    });
                } else {
                    internalServerError(res, err);
                }
            } else {
                res.status(201).json({});
            }
        });
    });
}

function login(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    req.db.query('select passwordHash from users where userName = ?',
        [username], function(err, rows, fields) {
        if (err) return internalServerError(res, err);

        if (rows.length < 1) {
            return res.status(404).json({
                error: 'No user with that username exists.'
            });
        }

        var user = rows[0];

        auth.checkPassword(password, user.passwordHash, function(err, ok) {
            if (err) return internalServerError(res, err);

            if (!ok) {
                return res.status(403).json({
                    error: 'Incorrect password.'
                });
            }

            res.status(200).json({
                token: auth.createToken({id: user.id})
            });
        });
    });
}

function getTopicTree(req, res) {
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
            req.db.query('select id, background, viewOrder, description from topics where parent = ? order by viewOrder',
                [query], function(err, rows){
                    callback(err, rows);

                });
        },
        function(topics, callback){
            async.forEachOf(topics, function(row, key, callback){
                if (topics[key].background == 0){
                    var query = topics[key].id
                    req.db.query('select id, background, viewOrder, description from topics where parent = ? order by viewOrder',
                        [query], function(err, rows){
                            if (err){
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
        if (err) return internalServerError(err);
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

function postPoliticianList(req,res){
    var items = req.body.listItems
    console.log('items: ', items);
    console.log('/politician-list post call called')
    async.forEachOf(items, function(item, key, callback){
        console.log(items[key]);
        db.query('INSERT INTO politicianLists SET ?', items[key], function(err, result){
            console.log('result from insert query: ', result);
            console.error('error: ', err);
        });
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

    app.post('/login', login);
    app.post('/register', register);
    app.get('/backgrounds/:id/questions', questionsByBackgroundId);
    app.get('/topic-tree/:topic', getTopicTree);
    app.post('/politician-list', postPoliticianList);

    app.use(function(err, req, res, next) {
        internalServerError(res, err);
    });

    return app;
};

