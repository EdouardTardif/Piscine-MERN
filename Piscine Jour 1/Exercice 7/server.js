// console.log('test');

var express = require('express')
var app = express()

var fs = require('fs')

var myMERN_module = require('./myMERN_module.js')



app.get('/files/:name',async function (req, res) {
    var name = req.params.name
    let text = await myMERN_module.read(name)
    console.log('2er '+text);

    // res.send(text);
})
app.post('/files/:name', function (req, res) {
    var name = req.params.name
    myMERN_module.create(name);
})
app.put('/files/:name/:content', function (req, res) {
    var name = req.params.name
    var content = req.params.content
    myMERN_module.update(name,content);
})
app.delete('/files/:name', function (req, res) {
    var name = req.params.name
    myMERN_module.delete(name);
})


app.listen(4242)