var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/thelist', function(req, res){
    var MongoClient = mongodb.MongoClient;

    var url = 'mongodb://localhost:27017/sampsite';

    MongoClient.connect(url, function(err, db){
        if(err){
            console.log('Unable to connect to the server',err)
        } else {
            console.log('Connection EEstablished');

            var collection = db.collection('patrons');

            collection .find({}).toArray(function(err, result){
                if(err){
                    res.send(err);
                } else if (result.length){
                    res.render('patronlist', {
                        'patronlist' : result
                    });
                } else {
                    res.send('No documents found');
                }
                db.close();
            });
        }
    });
});

router.get('/newpatron', function(req, res){
    res.render('newpatron', {title: "Add patron"});
});


router.post('/addpatron', function(req, res){
    var MongoClient = mongodb.MongoClient;

    var url = 'mongodb://localhost:27017/sampsite';

    MongoClient.connect(url, function(err, db){
        if (err){
            console.log("Unable to connect to server", err);
        } else {
            console.log("Connected to server");

            var collection = db.collection("patrons");

            var patron1 = {patron: req.body.patron, currentcode: req.body.currentcode, drink: req.body.drink};

            collection.insert([patron1], function(err, result){
                if (err) {
                    console.log(err);
                } else {
                    res.redirect("thelist");
                }
                db.close();
            });

        }
    });
});



module.exports = router;
