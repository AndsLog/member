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
        db.insert(pushData, function(err, result) {
            if (err) {
                return console.log('Failed to insert member: ' + err.message);
            }

            let id = result.id;
            pushData.id_key = id;
            pushData['id_key'] = id;
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
                return console.log('Failed to find member: ' + err.message);
            }
            console.log(data);
            res.status(200).json(data);
        });
    });
});

router.put('/update', function(req, res) {
    let name = req.body.name_key;
    let age = req.body.age_key;
    let sex = req.body.sex_key;
    let id = req.body.id_key;
    Cloudant({account:username, password:password}, function(err, cloudant) {
        if (err) {
          return console.log('Failed to initialize Cloudant: ' + err.message);
        }
        var db = cloudant.db.use('member');
        let query = {
            "selector": {
                "_id": {
                   "$eq": id
                }
             },
             "sort": [{"timestamp": "asc"}]
        }
        db.find(query, function(err, data) {
            if (err) {
                return console.log('Failed to find member: ' + err.message);
            }
            console.log(data);
            let doc = data.docs[0];
            doc.name = name;
            doc.age = age;
            doc.sex = sex;
            doc.updateTime = Date.now();
            db.insert(doc, function(err, result) {
                if (err) {
                    return console.log('Failed to update member: ' + err.message);
                }
                res.status(200).json(doc);
            })
        });
    });
});

router.delete('/delete', function(req, res) {
    let id = req.body.id_key;
    Cloudant({account:username, password:password}, function(err, cloudant) {
        if (err) {
            return console.log('Failed to initialize Cloudant: ' + err.message);
        }
        var db = cloudant.db.use('member');
        // let query = {
        //     "selector": {
        //         "_id": {
        //            "$eq": id
        //         }
        //      },
        //      "sort": [{"timestamp": "asc"}]
        // }
        db.get(id, function(err, data) {
            if (err) {
                return console.log('Failed to get doc: ' + err.message);
            }
            let rev = data._rev;
            db.destroy(id, rev, function(err, result) {
                if (err) {
                    return console.log('Failed to delete doc: ' + err.message);
                }
                res.status(200).json(result);
            });
        })
    })
});

module.exports = router;