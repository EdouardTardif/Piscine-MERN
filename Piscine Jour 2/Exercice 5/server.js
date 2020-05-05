const {MongoClient} = require('mongodb');
const express = require('express');
let app = express();
const fs = require('fs');
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

app.set('view engine','ejs')

app.get('/', function (req, res) {
    res.render('index')
})

app.post('/inscription', function (req, res) {

    let firstname = req.query.firstname;
    let lastname = req.query.lastname;
    let email = req.query.email;
    let phone = req.query.phone;
    let validated = 'in progress';
    let admin = false;
    console.log({firstname: firstname,lastname:lastname,email:email,phone:phone,validated:validated,admin:admin });

    // MongoClient.connect(uri,{useUnifiedTopology: true}, function(err, db) {
    //     if (err) throw err;
    //     var dbo = db.db("piscine-mern");
    //     var inscription = {firstname: firstname,lastname:lastname,email:email,phone:phone,validated:validated,admin:admin };
    //     dbo.collection("students").insertOne(inscription, function(err, res) {
    //       if (err) throw err;
    //       console.log("1 document inserted");
    //       db.close();
    //     });
    //   });
    res.render('index')
})


app.listen(4242,function(){
    console.log('Lance');
})