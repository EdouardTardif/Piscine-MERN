// console.log('test');

var express = require('express')
var app = express()

var fs = require('fs')

var myMERN_module = require('./myMERN_module.js')

myMERN_module.read('test');

app.listen(4242)