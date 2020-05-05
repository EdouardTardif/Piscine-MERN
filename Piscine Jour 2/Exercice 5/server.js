const {MongoClient} = require('mongodb');
const express = require('express');
let app = express();
const fs = require('fs');
let bodyParser = require('body-parser');

const uri = "mongodb://localhost:27017/mern-piscine";
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


app.set('view engine','ejs')

app.get('/', function (req, res) {
    res.render('index')
})

app.post('/inscription', async function (req, res) {

    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let email = req.body.email;
    let phone = req.body.phone;
    let validated = 'validated';
    let admin = false;
    // console.log({firstname: firstname,lastname:lastname,email:email,phone:phone,validated:validated,admin:admin });
    MongoClient.connect(uri,{useUnifiedTopology: true}, async function(err, db) {
        if (err) throw err;
        var dbo = db.db("mern-pool");
        var inscription = {firstname: firstname,lastname:lastname,email:email,phone:phone,validated:validated,admin:admin };
        let message = new Promise(function(resolve,reject){
            dbo.collection("students").insertOne(inscription, function(err, res) {
                let message = '';
                if (err) resolve('Failed to save the collection.');
                console.log("1 document inserted");
                resolve('Collection saved.');
                
                db.close();
            });
        });
        let test = await message;
        res.render('inscription',{message: test});
    });
})


app.listen(4242,function(){
    console.log('Lance');
})