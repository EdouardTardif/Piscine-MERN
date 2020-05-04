// console.log('test');

var express = require('express')
var app = express()

var fs = require('fs')

// fs.readFile('./home.html', (err, data) => {
//     if (err) throw err;
//     app.get('/', (req, res) => {
//         res.set('Content-Type', 'text/html')
//         res.send(data)
//     })
// });
app.get('/name/:name', function (req, res) {
    var name = req.params.name
    var age = req.query.age
    res.send('Hello '+name+', you have '+age+' yo!')
})
app.get('/name/', function (req, res) {
    var name = req.params.name
    res.send('Hello unknown i don\'t know your age !')
})

app.listen(4242)