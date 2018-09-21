var express = require('express');
var router = express.Router();
var Cloudant = require('@cloudant/cloudant');
var username = '8d7b7015-b208-4f31-a9f9-629517a59c6d-bluemix';
var password = 'd027579282ac1455b59256deec64144296da402b5e075117ad963f8e2961fdb5';

router.post('/create', function(req, res) {
    let name = req.body.name_key;
    let age = req.body.age_key;
    let sex = req.body.sex_key;
    let pushData = {
        "name": name,
        "age": age,
        "sex": sex,
        "timestamp": Date.now()
    }
    Cloudant({account:username, password:password}, function(err, cloudant) {
        if (err) {
          return console.log('Failed to initialize Cloudant: ' + err.message);
        }

        var db = cloudant.db.use('member');
        db.insert(pushData, function(err, data) {
            if (err) {
                return console.log('Failed to insert member: ' + err.message);
            }

            let id = data.id;
            pushData.id_key = id;
            res.status(200).json(pushData);
        });
    });
});

router.get('/take', function(req, res) {
    Cloudant({account:username, password:password}, function(err, cloudant) {
        if (err) {
          return console.log('Failed to initialize Cloudant: ' + err.message);
        }

        var db = cloudant.db.use('member');
        let query = {
            "selector": {
                "_id": {
                   "$gt": "0"
                }
             },
             "sort": [{"timestamp": "asc"}]
        }
        db.find(query, function(err, data) {
            if (err) {
                return console.log('Failed to insert member: ' + err.message);
            }
            console.log(data);
            res.status(200).json(data);
        });
    });
})

module.exports = router;