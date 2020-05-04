// console.log('test');

var express = require('express')
var app = express()
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(4242)