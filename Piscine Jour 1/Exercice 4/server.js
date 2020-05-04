// console.log('test');

var express = require('express')
var app = express()

var fs = require('fs')

fs.readFile('./home.html', (err, data) => {
    if (err) throw err;
    app.get('/', (req, res) => {
        res.set('Content-Type', 'text/html')
        res.send(data)
    })
    // app.get('/name/:name', function (req, res) {
    //     var name = 'Hello '+req.params.name+' !';
    //     res.set('Content-Type', 'text/html')
    //     res.send(data, {text:name});
    //     // res.send('Hello '+name+' !')
    // })
    app.get('/name/:name', function (req, res) {
        var name = req.params.name
        res.setHeader('Content-Type', 'text/html')
        res.render('home', { text: name }, function (err, html) {
        })
        // res.send('<h1>Hello '+name+' !</h1>')
    })
});

// app.render('home.html')

app.get('/name/', function (req, res) {
    var name = req.params.name
    res.setHeader('Content-Type', 'text/html')
    res.send('<h1>Hello unknown </h1>')
})

app.listen(4242)