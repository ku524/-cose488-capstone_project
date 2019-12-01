var express = require('express');
var router = express.Router();

const {Pool} = require("pg");
var conStr = "tcp://cose488:cose488@mr-y.asuscomm.com:5432/cose488";
const pool = new Pool({
    connectionString: conStr
});

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

//
router.post('/', function(request, response, next) {
    var time = request.body["time"];
    var location = request.body["location"];
    var id = request.body["id"];

    pool.connect(function(err, client, done) {
        if (err) {
            console.log("not able to get connection " + err);
            response.status(400).send(err);
        }
        var query_statement = "insert into DATA (ID, location, time) values($1, $2, $3);";
        client.query(query_statement, [id, location, time], function(err, result) {
            done();
            if (err) {
                console.log(err);
                response.status(400).send(err);
            } else response.status(200).send(result);
        });
    });

});

module.exports = router;