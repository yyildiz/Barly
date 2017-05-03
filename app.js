// Dependencies
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expjade = require('express-jade');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/barly');
var db = mongoose.connection;

var routes = require('./routes/index');
var users = require('./routes/users');
var singlebar = require('./routes/singlebar');
var checkout = require('./routes/checkout');


// Initialize Application
var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
//app.engine('jade', expjade({ defaultLayout:"layout" }));
app.set('view engine', 'jade');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, '/public')));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}))

// Passport Initialization
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
// In this example, the formParam value is going to get morphed into form body format useful for printing.
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));

// Connect Flash
app.use(flash());

// Global Variables
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

app.use('/', routes);

app.get('/users', function(req, res) {
    res.render('users');
});

app.get('/singlebar', function(req, res) {
    res.render('singlebar');
});

app.get('/checkout', function(req, res) {
    res.render('checkout');
});

// Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
    console.log('Server started on port '+app.get('port'));
});
