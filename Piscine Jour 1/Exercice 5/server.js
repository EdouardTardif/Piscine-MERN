// console.log('test');

var express = require('express')
var app = express()

var fs = require('fs')

app.set('view engine','ejs')

app.get('/name/:name', function (req, res) {
    var name = req.params.name
    var age = req.query.age
    let text = 'Hello '+name+', you have '+age+' yo!';
    res.render('index', { text: text })

})
app.get('/name/', function (req, res) {
    let text = 'Hello unknown i don\'t know your age !';
    res.render('index', { text: text })
})

app.listen(4242)