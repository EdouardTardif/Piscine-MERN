
class BilletModel {

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
            console.log('Connection reussi');
            this.dbo = db.db("jour3");
        });
    }
    
    
    async register(data,collection){


        
        // data.password = this.crypto.createHash('sha1').update(JSON.stringify(data.password)).digest('hex')

        let res = await this.dbo.collection(collection).insertOne(data);
        return new Promise(function(resolve,reject){
            resolve(res);
        })
    }
    
    async update(id,data,collection){
        // console.log('AuthModel : ' ,this.db ,{id,data,collection})
        let res = await this.dbo.collection(collection).updateOne({_id : id},{ $set : data });
        return new Promise(function(resolve,reject){
            resolve(res);
        })
    }
    
    async fetchall(collection){
        let res = await this.dbo.collection(collection).find().toArray();
        return new Promise(function(resolve,reject){
            resolve(res);
        })
    }

    async fetch(data,collection){

        let res = await this.dbo.collection(collection).find(data).toArray();
        return new Promise(function(resolve,reject){
            resolve(res);
        })
    }



    async delete(id,collection){
        let res = await this.dbo.collection(collection).deleteOne({_id : id});
        return new Promise(function(resolve,reject){
            resolve(res);
        })
    }
    // async loginwithid(data,collection){

    //     let res = await this.dbo.collection(collection).find(data).toArray();
    //     return new Promise(function(resolve,reject){
    //         resolve(res);
    //     })
    // }

    

}

module.exports = new BilletModel()
