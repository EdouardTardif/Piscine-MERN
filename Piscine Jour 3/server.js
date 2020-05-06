const {MongoClient} = require('mongodb');
const express = require('express');
let app = express();
const fs = require('fs');
let bodyParser = require('body-parser');

const uri = "mongodb://localhost:27017/jour3";
app.set('view engine','ejs')


async function main(){
    const client = new MongoClient(uri,{useUnifiedTopology: true});
    // await client.connect();
    // await listDatabases(client);
    try {
        await client.connect();
        console.log('Connection Reussi');
    } catch (e) {
        console.log('Connection failed')
        console.error(e);

    }
}

main().catch(console.error);

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
})); 


let AuthController = require('./Controller/AuthController.js');


app.get('/', function (req, res) {
    AuthController.index(req,res);
    
})

app.post('/register', function (req, res) {
    AuthController.register(req,res);    
})

app.listen(4242,function(){
    console.log('Lance');
})