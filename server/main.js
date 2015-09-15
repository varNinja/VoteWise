var express = require('express');
var mysql = require('mysql');
var config = require('./config');
var crypto = require('crypto');
var bodyParser = require('body-parser');
var async = require('async');

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
app.use(bodyParser.json());

// app.get('/backgrounds/<id>/questions/:userId', function(req,res){
//     console.log("app.get at /backgrounds/<id>/questions called");
//     db.query
// })

app.get('/questions/:id', function(req,res){
    var questionSet = req.params.id;
    console.log(questionSet);
    console.log('questionSet from req.params: ', questionSet);
    db.query('select description, id, viewOrder from concurrenceQuestions where background = ?',
        [questionSet], function(err, rows){
            console.log('rows: ', rows);
        });
})

app.post('/politician-list', function(req,res){
    var items = req.body.listItems
    console.log('items: ', items);
    console.log('/politician-list post call called')
    async.forEachOf(items, function(item, key, callback){
            console.log(items[key]);
            db.query('INSERT INTO politicianLists SET ?', items[key], function(err, result){
                console.log('result from insert query: ', result);
                console.error('error: ', err);
            });
    } )
})

app.put('/politicianList', function(req, res){

})

app.get('/answers-by-user/:id', function(req,res){
    var userId = req.params.id;
    db.query('select description, background, question, concurrence, importance, comment, from concurrenceAnswers where id = ?',
        [userId], function(err, rows){
            console.log('rows: ', rows); 
        });
})

// app.post('/questions/:id/answer', function(req,res){
//     var questionId = req.params.id;
//     db.query('select type from questions where id = ?', 
//         [questionId], funciton(err, rows){
//             console.log(rows);
//         }
// })




app.get('/get-topic-tree/:topic', function(req, res){
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
            async.forEachOf(topics, function(topic, key, callback){
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
        }
    ], function(err, topics){
       console.log("from end of waterfall: ", topics);
       res.status(200).json(
            topics
        );
    });
})

var server = app.listen(config.port, function() {
    var address = server.address();

    console.log('Example app listening at http://%s:%s',
                address.address, address.port);
});