// console.log('test');

var express = require('express')
var app = express()
app.get('/', (req, res) => res.send('Great ! It works.'))
app.listen(4242)