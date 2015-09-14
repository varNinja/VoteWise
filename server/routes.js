var async = require('async');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var express = require('express');

function getTopicTrees(req, res){
    console.log("app.get at /getTopicTrees called");
    var topic = req.params.topic;
    console.log("req.params.topic: " + topic);

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
                console.log('rows[key].id: ', topics[key].id);
                if (topics[key].background == 0){
                    var query = topics[key].id
                    req.db.query('select id, background, viewOrder, description from topics where parent = ? order by viewOrder',
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

var questionsByBackgroundId = function(req,res){
    var questionSet = req.params.id;
    console.log('questionSet from req.params: ', questionSet);
    req.db.query('select description, id from concurrenceQuestions where background = ?',
        [questionSet], function(err, rows){
            console.log('rows: ', rows);
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

    app.get('/questions/:id', questionsByBackgroundId);
    app.get('/getTopicTree/:topic', getTopicTrees);

    return app;
}

