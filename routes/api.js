var express = require('express');
var router = express.Router();
var Cloudant = require('@cloudant/cloudant');
var username = '8d7b7015-b208-4f31-a9f9-629517a59c6d-bluemix';
var password = 'd027579282ac1455b59256deec64144296da402b5e075117ad963f8e2961fdb5';

router.post('/create', function(req, res) {
    let name = req.body.name_Key;
    let age = req.body.age_key;
    let sex = req.body.sex_key;
    let push = {
        "name": name,
        "age": age,
        "sex": sex
    }
    Cloudant({account:username, password:password}, function(err, cloudant) {
        if (err) {
          return console.log('Failed to initialize Cloudant: ' + err.message);
        }

        
        var db = cloudant.db.use('member');
        db.insert(push, function(err, data) {
          console.log("Found dog:", data);
          res.status(200).json(data);
        });
    });
});

module.exports = router;