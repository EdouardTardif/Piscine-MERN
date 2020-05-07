const {MongoClient} = require('mongodb');
const express = require('express');
let app = express();
const fs = require('fs');
let bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const session = require('express-session');
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));

var sess;

// const redis = require('redis');
// const redisStore = require('connect-redis')(session);
// app.use(session({
//     secret: 'ssshhhhh',
//     // create new redis store.
//     store: new redisStore({ host: 'localhost', port: 6379, client: client,ttl : 260}),
//     saveUninitialized: false,
//     resave: false
// }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.set('view engine','ejs')



app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
})); 


let AuthController = require('./Controller/AuthController.js');


app.get('/', function (req, res) {
    AuthController.index(req,res);
    
})
app.get('/users', function (req, res) {
    AuthController.fetchall(req,res);
})
app.post('/register', [
    check('email','email is incorect').isEmail(),
    check('login','login must have 5 to 20 characters').isLength({ min: 5, max: 20 })
  ], function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).json({ errors: errors.array() });
    } else {
        AuthController.register(req,res);
    }
})


app.get('/login', function (req, res) {
    AuthController.login(req,res);
})
app.get('/profile', function (req, res) {
    AuthController.profile(req,res);
})
app.post('/login/test', function (req, res) {
    AuthController.logintest(req,res);
})

app.get('/logout', function (req, res) {
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/login');
    });
})






let BoutiqueController = require('./Controller/BoutiqueController.js');

app.get('/boutique', function (req, res) {
    BoutiqueController.showall(req,res);
})
app.get('/boutique/:id', function (req, res) {
    BoutiqueController.show(req,res);
})
app.get('/admin/add', function (req, res) {
    BoutiqueController.create(req,res);
})
app.post('/create/new/product',[ check('prix','prix is incorect').isInt(), ], function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).json({ errors: errors.array() });
    } else {
        BoutiqueController.createproduct(req,res);
    }
})

/*ROUTE DISPO POUR TEST
/
/login
/profile
/boutique
/boutique/:id
/admin/add


*/ 


app.listen(4242,function(){
    console.log('Lance');
})