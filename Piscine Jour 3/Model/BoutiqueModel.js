class BoutiqueModel {

    constructor(){
        this.express = require('express');
        this.app = this.express();
        this.bodyParser = require('body-parser');
        this.crypto = require('crypto');



        this.app.use( this.bodyParser.json() );
        this.app.use(this.bodyParser.urlencoded({     // to support URL-encoded bodies
            extended: true
        })); 

        this.app.set('view engine','ejs')




        this.MongoClient = require('mongodb');
        this.uri = "mongodb://localhost:27017/mern-piscine";
        this.MongoClient.connect(this.uri,{useUnifiedTopology: true}, (err, db) => {
            if (err) throw err;
            this.dbo = db.db("jour3");
        });
    }


    async fetchall(collection){
        let res = await this.dbo.collection(collection).find().toArray();
        return new Promise(function(resolve,reject){
            resolve(res);
        })
    }

    async test(data,collection){

        let res = await this.dbo.collection(collection).find(data).toArray();
        return new Promise(function(resolve,reject){
            resolve(res);
        })
    }
}

module.exports = new BoutiqueModel()
