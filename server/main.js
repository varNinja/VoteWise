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

app.get('/backgrounds/<id>/questions/:userId', function(req,res){
    console.log("app.get at /backgrounds/<id>/questions called");
    db.query
})


app.get('/questions/:id', function(req,res){
    var questionSet = req.params.id;
    console.log('questionSet from req.params: ', questionSet);
    db.query('select description, id from concurrenceQuestions where background = ?',
        [questionSet], function(err, rows){
            console.log('rows: ', rows);
        });
})



app.get('/getTopicTree/:topic', function(req, res){
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
})

// app.get('/getTopicTree/:topic', function(req, res){
//     console.log("app.get at /getTopicTrees called");
//     var topic = req.params.topic;
//     console.log("req.params.topic: " + topic);

    // db.query('select id from topics where description = ?',
    // [topic], function(err, rows, fields) {
    //     if (err) {
    //         console.error(err);
    //         res.status(500).json({
    //             error: 'Internal server error.'
    //         });
    //         return;
    //     }
//         var parentTopic = rows[0];
//         var parentId = parentTopic.id;
//         console.log("parentTopic is: " + JSON.stringify(parentTopic));
        
//         db.query('select id, background, viewOrder, description from topics where parent = ? order by viewOrder',
//             [parentId],function(err, rows, fields) {
       
//             if (err) {
//                 console.error(err);
//                 res.status(500).json({
//                     error: 'Internal server error.'
//                 });
//                 return;
//             }
//             var topicChildren = rows;

//             console.log('rows from parent id query: ' + rows);
            
//             for (var i = 0 ; i < topicChildren.length; i++){
//                 console.log("topicChildren are: " + JSON.stringify(topicChildren[i]));
//                 console.log("topicChildren[i]'s background: " + topicChildren[i].background);
//                 console.log("rows[i]'s background: " + rows[i].background);
//                 if (rows[i].background==0){
//                     console.log(rows[i].background);
//                     console.log(rows[i].id);
//                     var parentId = rows[i].id;
//                     console.log(parentId);
//                     var subTopic

//                        db.query('select id, background, viewOrder, description from topics where parent = ? order by viewOrder',
//                         [parentId], function(err,rows,fields){
//                             console.log("ROWS FROM SUBSUBTOPIC QUERY: " + JSON.stringify(rows));
//                             // console.log("closure rows[i].subTopic: " + JSON.stringify(subTopic[i].subTopic));
//                             subTopic = rows
//                             console.log("subTopic from inside last query: ", subTopic);
//                     });
//                     console.log("subTopic from after last db.query: ", subTopic)
//                 }


//                 // if (rows[i].background == 0){
//                 //     console.log("START OF if statement in for loop");
//                 //     var parentId = rows[i].id;
//                 //     console.log("PARENT ID IS: " + parentId)
//                 //     db.query('select id, background, viewOrder, description from topics where parent = ? order by viewOrder',
//                 //         [parentId], function(err,rows1,fields){
//                 //             if(err){
//                 //                 console.error(err);
//                 //                 res.status(500).json({
//                 //                     error: 'Internal error'
//                 //                 })
//                 //             }
//                 //             var subTopicChildren = rows
//                 //             for(var i = 0; i < topicChildren.length; i++){
//                 //                 console.log("INSIDE SECOND FOR LOOP" + JSON.stringify(subTopicChildren[i]));
//                 //             };
//                 //         })
//                 //     console.log(JSON.stringify(topicChildren));
//                 //     console.log("END OF if statement in for loop");
//                 // };
//             }
//         });
//     });
// })

var server = app.listen(config.port, function() {
    var address = server.address();

    console.log('Example app listening at http://%s:%s',
                address.address, address.port);
});