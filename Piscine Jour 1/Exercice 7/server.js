// console.log('test');

var express = require('express')
var app = express()

var fs = require('fs')

var myMERN_module = require('./myMERN_module.js')



app.get('/files/:name', async function (req, res) {
    var name = req.params.name
    let text = await myMERN_module.read(name)
    res.send(text)
})
app.post('/files/:name', async function (req, res) {
    var name = req.params.name
    let text = await myMERN_module.create(name);
    res.send(text)

})
app.put('/files/:name/:content', async function (req, res) {
    var name = req.params.name
    var content = req.params.content
    let text = await myMERN_module.update(name,content);
    res.send(text)
})
app.delete('/files/:name', async function (req, res) {
    var name = req.params.name
    let text = await myMERN_module.delete(name);
    res.send(text)
})


app.listen(4242)