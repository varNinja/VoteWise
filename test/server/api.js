var config = require('./config');
var makeAPI = require('../../server/api');
var mysql = require('mysql');
var test = require('tape');

function call(req, done) {
    var db = mysql.createConnection({
        connectionLimit: config.db.connectionLimit,
        host:            config.db.host,
        user:            config.db.user,
        password:        config.db.password,
        database:        config.db.database,
        port:            config.db.port
    });

    var app = makeAPI(db);

    if (!req.headers) req.headers = {};

    var result = {
        headers: {},
        status:  200
    };

    function _done() {
        db.end(function(err) {
            if (err) throw err;
            done(result);
        });
    }

    var res = {
        setHeader: function(name,value){
            result.headers[name.toLowerCase()] = value
            return this;
        },
        status: function(code) {
            result.status = code;
            return this;
        },
        json: function(data) {
            result.body = data;
            _done();
        }
    };

    app(req, res, _done);
}

test('API calls', function(t) {
    t.test('/backgrounds/:id/questions', function(t) {
        t.plan(2);

        call({
            method: 'get',
            url: '/backgrounds/3/questions'
        }, function(res) {
            t.equal(res.status, 200);
            t.deepEqual(res.body,  [
                { description: 'All businesses should be required to provide ' +
                               'health insurance or contribute to a pool so '  +
                               'that everyone who is working gets health care.'
                , id: 538
                },
                { description: 'To avoid this, one hour of work should earn '  +
                               'you one hour worth of benefits.  This way, '   +
                               'no one would be capped at some small number '  +
                               'of hours just they could avoid paying benefits.'
                , id: 539
                },
                { description: 'American businesses are overburdened as it '   +
                               'is. Additional costs of production will have ' +
                               'to be passed on as raised prices. Our '        +
                               'products are hard enough to sell overseas as ' +
                               'it is, and this will price them out of the '   +
                               'market.'
                , id: 540
                },
                { description: 'This isn’t that big an issue. Things seem fine.'
                , id: 541
                }
            ]);
        });
    });

    t.test('/topic-tree/3', function(t) {
        t.plan(2);

        call({
            method: 'get',
            url: '/topic-tree/Energy'
        }, function(res) {
            t.equal(res.status, 200);
            t.deepEqual(res.body, [
                { description: 'General'
                , background: 0, id: 49 , subTopics: [] , viewOrder: 1 },
                { description: 'Conservation And Increased Efficiency'
                , background: 12, id: 50 , viewOrder: 2 },
                { description: 'Carbon Cap And Trade'
                , background: 5 , id: 51 , viewOrder: 3 },
                { description: 'Fracking'
                , background: 24, id: 52, viewOrder: 4 },
                { description: 'Oil'
                , background: 49 , id: 53 , viewOrder: 5 },
                { description: 'Coal'
                , background: 10 , id: 54 , viewOrder: 6 },
                { description: 'Natural Gas'
                , background: 47 , id: 55 , viewOrder: 7 },
                { description: 'Nuclear Power'
                , background: 48 , id: 56 , viewOrder: 8 },
                { description: 'Wind'
                , background: 86 , id: 57 , viewOrder: 9 },
                { description: 'Solar'
                , background: 64 , id: 58 , viewOrder: 10 },
                { description: 'Favorites'
                , background: 0 , id: 59 , subTopics: [] , viewOrder: 11 }
            ]);
        });
    });
});

