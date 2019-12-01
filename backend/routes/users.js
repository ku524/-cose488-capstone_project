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
  var id = request.body["id"];
  var gender = request.body["gender"];
  var age = request.body["age"];

  pool.connect(function(err, client, done) {
      if (err) {
        console.log("not able to get connection " + err);
        response.status(400).send(err);
      }
      var query_statement = "insert into USERS (ID, age, gender) values($1, $2, $3);";
      client.query(query_statement, [id, age, gender], function(err, result) {
        done();
        if (err) {
            console.log(err);
            response.status(400).send(err);
        } else response.status(200).send(result);
      });
  });
});

module.exports = router;