// console.log('test');

var express = require('express')
var app = express()

var fs = require('fs')


app.set('view engine','ejs')

app.get('/name/:name', function (req, res) {
    var name = 'Hello '+req.params.name
    res.render('index', { text: name })
    // res.send('<h1>Hello '+name+' !</h1>')
})
app.get('/name/', function (req, res) {
    var name = 'Hello unknown !'
    res.render('index', { text: name })

})

app.listen(4242)