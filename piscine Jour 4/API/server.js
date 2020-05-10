const {MongoClient} = require('mongodb');
const express = require('express');
let app = express();
const fs = require('fs');
let bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');




// const session = require('express-session');
// app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
// var sess;


const secret = 'mysecretsshhh';
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
// const withAuth = require('./Controller/withAuth.js');



const withAuth = function(req, res, next) {
    let token = req.headers["x-access-token"];
    console.log(req.cookies.token);
    // const token = req.cookies.token;
    console.log(token);
    if (!token) {
      res.status(401).send('Unauthorized: No token provided');
    } else {
      jwt.verify(token, secret, function(err, decoded) {
        if (err) {
          res.status(401).send('Unauthorized: Invalid token');
        } else {
            req._id = decoded._id;
          req.email = decoded.email;
          next();
        }
      });
    }
}


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
    // res.header("Content-Type: application/json")
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    // res.header(
    //     "Access-Control-Allow-Headers","x-access-token, Origin, Content-Type , Accept");
    // res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, x-access-token, X-Requested-With, Content-Type, Accept");
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
        res.json({ error: {else : errors.array()} });
    } else {
        AuthController.register(req,res);
    } 
})
app.post('/user/update', [
    check('email','email is incorect').isEmail(),
    check('login','login must have 5 to 20 characters').isLength({ min: 5, max: 20 })
  ], function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        res.json({ error: {else : errors.array()} });
    } else {
        AuthController.updateuser(req,res);
    } 
})

app.get('/login', function (req, res) {
    AuthController.login(req,res);
})
app.get('/profile',withAuth, function (req, res) {
    AuthController.profile(req,res);
})
app.post('/login/test', function (req, res) {
    AuthController.logintest(req,res);
})
app.post('/user/delete', function (req, res) {
    AuthController.deleteuser(req,res);
})


app.get('/logout', function (req, res) {
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/login');
    });
})

app.get('/isconnected', function (req, res) {
    AuthController.isconnected(req,res);
})

app.get('/checkToken', withAuth , function(req, res) {
    res.sendStatus(200);
});

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



let BilletController = require('./Controller/BilletController');

app.post('/billet/create', function (req, res) {
    BilletController.create(req,res);
})
app.post('/myblog', function (req, res) {
    BilletController.fetchmyblog(req,res);
})

app.post('/billet/info', function (req, res) {
    BilletController.fetchinfo(req,res);
})
app.post('/billet/delete', function (req, res) {
    BilletController.delete(req,res);
})





app.listen(4242,function(){
    console.log('Lance');
})