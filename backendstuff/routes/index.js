var express = require('express');
var router = express.Router();

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
    res.render('index');
});

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        console.log("Authenticated")
        return next();
    } else{
        //req.flash('error_msg', 'You are not logged in');
        console.log("Not")
        return next();

        res.redirect('/users/login');
    }
}

module.exports = router;
