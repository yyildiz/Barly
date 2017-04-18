var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/barslist', function(req, res){
    var MongoClient = mongodb.MongoClient;

    var url = 'mongodb://localhost:27017/sampsite';

    MongoClient.connect(url, function(err, db){
        if(err){
            console.log('Unable to connect to the server',err)
        } else {
            console.log('Connection EEstablished');

            var collection = db.collection('bars');

            collection .find({}).toArray(function(err, result){
                if(err){
                    res.send(err);
                } else if (result.length){
                    res.render('barslist', {
                        'barslist' : result
                    });
                } else {
                    res.send('No documents found');
                }
                db.close();
            });
        }
    });
});

router.get('/drinkslist', function(req, res){
    var MongoClient = mongodb.MongoClient;

    var url = 'mongodb://localhost:27017/sampsite';

    MongoClient.connect(url, function(err, db){
        if(err){
            console.log('Unable to connect to the server',err)
        } else {
            console.log('Connection Established');

            var collection = db.collection('drinks');

            collection .find({}).toArray(function(err, result){
                if(err){
                    res.send(err);
                } else if (result.length){
                    res.render('drinkslist', {
                        'drinkslist' : result
                    });
                } else {
                    res.send('No documents found');
                }
                db.close();
            });
        }
    });
});

router.get('/newdrink', function(req, res){
    res.render('newdrink', {title: "Add Drink"});
});

router.get('/singlebar', function(req, res){
    res.render('singlebar', {title: "Bar Listing"});
});

router.post('/adddrink', function(req, res){
    var MongoClient = mongodb.MongoClient;

    var url = 'mongodb://localhost:27017/sampsite';

    MongoClient.connect(url, function(err, db){
        if (err){
            console.log("Unable to connect to server", err);
        } else {
            console.log("Connected to server");

            var collection = db.collection("drinks");

            var drink1 = {drink_name: req.body.drink_name, bar_name: req.body.bar_name, price: req.body.price};

            collection.insert([drink1], function(err, result){
                if (err) {
                    console.log(err);
                } else {
                    res.redirect("drinkslist");
                }
                db.close();
            });

        }
    });
});



module.exports = router;
