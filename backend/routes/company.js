var express = require('express');
var router = express.Router();

const {Pool} = require("pg");
var conStr = "tcp://cose488:cose488@mr-y.asuscomm.com:5432/cose488";
const pool = new Pool({
    connectionString: conStr
});

/* GET users listing. */
router.get('/', function(request, response, next) {
    var point_x = parseInt(request.query["centerX"]);
    var point_y = parseInt(request.query["centerY"]);
    var radius = parseInt(request.query["radius"]);
    var time = request.query["date"];

    var x1 = point_x - (radius / 88);
    var x2 = point_x + (radius / 88);
    var y1 = point_y - (radius / 111);
    var y2 = point_y + (radius / 111);

    pool.connect(function(err, client, done) {
        if (err) {
            console.log("not able to get connection " + err);
            response.status(400).send(err);
        }
        var query_statement = "SELECT id, array_agg(location) as locations, array_agg(time) as times, max(age) as age, max(gender) as gender \
        FROM data natural join users \
        WHERE location <@ box(point($1,$2), point($3,$4)) and date(time)=$5 GROUP BY id";

        client.query(query_statement, [x1,y1,x2,y2, time], function(err, result) {
            done();
            if (err) {
                console.log(err);
                response.status(400).send(err);
            } else {
                response.status(200).send(result.rows);
            }
        });
    });

});

//
router.post('/', function(request, response, next) {
    var id = request.body["id"];
    var company_name = request.body["name"];
    var phone_number = request.body["number"];

    var registration_date = new Date();
    var expiration_date = new Date();
    expiration_date.setMonth(expiration_date.getMonth()+1);

    pool.connect(function(err, client, done) {
        if (err) {
            console.log("not able to get connection " + err);
            response.status(400).send(err);
        }
        var query_statement = "insert into company (ID, company_name, phone_number, registration_date, expiration_date) values($1, $2, $3, $4, $5);";
        client.query(query_statement, [id, company_name, phone_number, registration_date, expiration_date], function(err, result) {
            done();
            if (err) {
                console.log(err);
                response.status(400).send(err);
            } else response.status(200).send(result);
        });
    });

});

module.exports = router;