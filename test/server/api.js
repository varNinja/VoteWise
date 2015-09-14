var config = require('./config');
var createApp = require('../../server/routes');
var mysql = require('mysql');
var test = require('tape');

var db = mysql.createPool({
    connectionLimit: config.db.connectionLimit,
    host:            config.db.host,
    user:            config.db.user,
    password:        config.db.password,
    database:        config.db.database,
    port:            config.db.port
});

test('API calls', function(t) {
    t.test('/questions/<id>', function(t) {
        var app = createApp(db);

        var req = {
            method: 'get',
            headers: {},
            url: '/questions/3'
        };
        var res = {
            headers : {},
            setHeader : function(name,value){
            console.log('setHeader', name, value);
            this.headers[name.toLowerCase()] = value
            }
        };

     app(req, res);
    })
});
