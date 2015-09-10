var express = require('express');
var mysql = require('mysql');
var config = require('./config');
var crypto = require('crypto');
var bodyParser = require('body-parser');

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

// app.get('/topics', function (req, res))

app.get('/getTopicTree/:topic', function(req, res){
    console.log("app.get at /getTopicTrees called");
    var topic = req.params.topic;
    console.log("req.params.topic: " + topic);
    db.query('select id from topics where description = ?',
    [topic], function(err, rows, fields) {
       
        if (err) {
            console.error(err);
            res.status(500).json({
                error: 'Internal server error.'
            });
            return;
        }

        var parentTopic = rows[0];
        var parentId = parentTopic.id;
        console.log("parentTopic is: " + JSON.stringify(parentTopic));


        db.query('select id, viewOrder, description from topics where parent = ? order by viewOrder',
            [parentId],function(err, rows, fields) {
       
            if (err) {
                console.error(err);
                res.status(500).json({
                    error: 'Internal server error.'
                });
                return;
            }
            var topicChildren = rows;

            console.log('rows from parent id query: ' + rows[0]);
            for (var i = 0 ; i < topicChildren.length; i++){
                console.log("topicChildren are: " + JSON.stringify(topicChildren[i]));
            }
            res.status(200).json(
                rows
            )



            
        });


    });
})

var server = app.listen(config.port, function() {
    var address = server.address();

    console.log('Example app listening at http://%s:%s',
                address.address, address.port);
});