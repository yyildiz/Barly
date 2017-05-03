var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    console.log(res)
    console.log(req)
    res.render('checkout');

});

module.exports = router;
