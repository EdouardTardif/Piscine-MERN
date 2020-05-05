const {MongoClient} = require('mongodb');
const express = require('express');
let app = express();
const fs = require('fs');
let bodyParser = require('body-parser');

const uri = "mongodb://localhost:27017/mern-pool";
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

app.get('/', function (req, ress) {

    MongoClient.connect(uri,{useUnifiedTopology: true}, async function(err, db) {
        var dbo = db.db("mern-pool");
        dbo.collection("students").find({validated:'in progress'}).sort({lastname: 1}).toArray(function(err, res) {
            let error = null;
            if (err) error = ('Failed to show the collection.');
            db.close();
            console.log(res[0].firstname);
            ress.render('inscription',{users: res,error:error});
        });
    });
})



app.listen(4242,function(){
    console.log('Lance');
})