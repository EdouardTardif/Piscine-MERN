
class BilletController {

    constructor(){
        this.express = require('express');
        this.app = this.express();
        this.bodyParser = require('body-parser');
        this.crypto = require('crypto');
        this.session = require('express-session');
        this.sess;

        this.ObjectId = require('mongodb').ObjectId; 

        this.app.use( this.bodyParser.json() );
        this.app.use(this.bodyParser.urlencoded({     // to support URL-encoded bodies
            extended: true
        })); 
        this.secret = 'mysecretsshhh';
        this.jwt = require('jsonwebtoken');
        this.app.set('view engine','ejs')

        this.AuthModel = require('../Model/AuthModel.js');
        this.BilletModel = require('../Model/BilletModel.js');
    }
    
    
    async create(req,res){

        let data = {
            creator : this.ObjectId(req.body.id),
            titre : req.body.titre,
            content : req.body.content,
        }
        console.log(data);
        let resultat = await this.BilletModel.register(data,'billets');
        if(typeof resultat !== 'undefined'){
            console.log('CONNECTING----------NEW BILLET----------------------->'+resultat.insertedId);
            res.status(200);

        } else {
            res.status(400);
            res.send('None shall pass');
        }
    }
    
    async fetchmyblog(req,res)
    {
        let data = {
            creator : this.ObjectId(req.body.id),
        }
        console.log(data);
        let resultat = await this.BilletModel.fetch(data,'billets');
        if(typeof resultat !== 'undefined'){
            console.log('FETCH----------BLOG----------------------->'+req.body.id);
            res.status(200).json({ allbillet : resultat});

        } else {
            res.status(400);
            res.send('None shall pass');
        }
    }

    async fetchinfo(req,res)
    {
        let data = {
            _id : this.ObjectId(req.body.id),
        }
        console.log(data);
        let resultat = await this.BilletModel.fetch(data,'billets');
        if(typeof resultat !== 'undefined'){
            console.log('FETCH----------BLOG----------------------->'+req.body.id);
            res.status(200).json({ billetinfo : resultat[0]});

        } else {
            res.status(400);
            res.send('None shall pass');
        }
    }


    async delete(req,res)
    {
        let id = this.ObjectId(req.body.id);

        let resultat = await this.BilletModel.delete(id,'billets');
        if(typeof resultat !== 'undefined'){
            console.log('DELETED----------BLOG----------------------->'+req.body.id);
            res.sendStatus(200);

        } else {
            res.status(400);
            res.send('None shall pass');
        }
    }


    async update(req,res){
        let id = req.body.id;
        let data = {
            titre: req.body.titre,
            content: req.body.content,
        }
        console.log({id,data})
        let resultat = await this.BilletModel.update(this.ObjectId(id),data,'billets');
        if(typeof resultat !== 'undefined'){
            console.log('CONNECTING----------NEW BILLET UPDATE----------------------->'+id);

            
            res.sendStatus(200);
        } else {
            res.status(400);
            res.send('None shall pass');
        }
    }

    async fetchallblog(req,res)
    {
        let id  = this.ObjectId(req.body.creator);
        console.log(id);
        let resultat = await this.BilletModel.fetchwherenot(id,'billets');
        if(typeof resultat !== 'undefined'){
            resultat.user = [];
            

            const getData = async () => {
                return Promise.all(resultat.map( async e => {
                    // console.log(e.creator);
                    return e.creator.user =  await this.BilletModel.fetch({_id : this.ObjectId(e.creator)}, 'users');
                    // resultat.user.push({id : user[0]._id, login :user[0].login , email :user[0].email });
                }))
            }
            getData().then(resul => {
                res.status(200).json({ allblogs : {resultat,resul}});
                console.log(resul,resultat);
            })
            console.log('FETCH----------BLOG-----FOR THIS USER------------------>'+req.body.creator);

        } else {
            res.status(400);
            res.send('None shall pass');
        }
    }



}

module.exports = new BilletController()
