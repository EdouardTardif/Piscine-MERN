
class AuthController {

    // static async create(name){
    //     let fs = require('fs')
    //     return new Promise(function(resolve,reject){
    //         fs.writeFile(name, 'oui', (err) => {
    //             if (err) resolve('Create '+name+': KO');
    //             resolve('Create '+name+': OK');
    //         });
    //     });
    // }


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
    }
    
    
    index(req,res){
        res.render('index');
    }

    async register(req,res){
        
        if(req.body.password == req.body.password2){
            let data = {
                login: req.body.login,
                password: req.body.password,
                email: req.body.email,
                type:false,
            }
            let resultat = await this.AuthModel.register(data,'users');
            if(typeof resultat !== 'undefined'){
                console.log('CONNECTING----------NEW REGISTRATION----------------------->'+resultat.insertedId);
                resultat = await this.AuthModel.fetch({_id:resultat.insertedId},'users');

                const payload = {email : resultat[0].email, id: resultat[0]._id.toString() , login : resultat[0].login , admin : resultat[0].type};
                const token = this.jwt.sign(payload, this.secret, {
                    expiresIn: '1h',
                });
                res.status(200).json({token : token, userId : resultat[0]._id.toString()});


            } else {
                res.status(400);
                res.send('None shall pass');
            }
            // res.render('inscription',{data:data});
        } else {
            res.status(200).json({isloggedin : false,error : {password:'Les mots de passe ne sont pas les memes'}});
            // res.render('index',{error:'Les mots de passe ne sont pas les memes'});
        }
    }


    async fetchall(req,res){
        let resultat = await this.AuthModel.fetchall('users');
        // console.log(resultat);
        res.json(resultat);
        // res.render('users',{users:resultat});
    }


    async updateuser(req,res){
            let id = req.body.id;
            let data = {
                login: req.body.login,
                email: req.body.email,
            }
            console.log({id,data})
            let resultat = await this.AuthModel.update(this.ObjectId(id),data,'users');
            // console.log(resultat);
            if(typeof resultat !== 'undefined'){
                console.log('CONNECTING----------NEW UPDATE----------------------->'+id);
                resultat = await this.AuthModel.fetch({_id:id},'users');

                const payload = {email : resultat[0].email, id: resultat[0]._id.toString() , login : resultat[0].login , admin : resultat[0].type};
                const token = this.jwt.sign(payload, this.secret, {
                    expiresIn: '1h',
                });
                res.status(200).json({token : token, userId : resultat[0]._id.toString()});
            } else {
                res.status(400);
                res.send('None shall pass');
            }
    }


    async deleteuser(req,res) {
        let id = req.body.id;
        let resultat = await this.AuthModel.delete(this.ObjectId(id),'users');
        if(typeof resultat !== 'undefined'){
            res.status(200).json({deleted : true});
        } else {
            res.status(400).json({deleted : false});
        }
    }




    login(req,res){
        res.render('login');
    }
    async logintest(req,res){
        let data = {
            password: req.body.password,
            email: req.body.email,
        }

        console.log(data);
        data.password = this.crypto.createHash('sha1').update(JSON.stringify(data.password)).digest('hex')
        let resultat = await this.AuthModel.fetch(data,'users');
        if(resultat.length == 1){
            console.log('CONNECTING----------LOGIN----------------------->'+resultat[0]._id);


            const payload = {email : resultat[0].email, id: resultat[0]._id.toString() , login : resultat[0].login , admin : resultat[0].type};
            const token = this.jwt.sign(payload, this.secret, {
                expiresIn: '1h',
            });
            // console.log(token);
            // res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 2, httpOnly: false })
            // console.log(req.cookies);
            res.status(200).json({token : token, userId : resultat[0]._id.toString()});



            // this.sess = req.session;
            // this.sess._id = resultat[0]._id;
            // this.sess.email = resultat[0].email;
            // this.sess.login = resultat[0].login;
            // this.sess.admin = resultat[0].type;
            // res.json({isloggedin : true});
            // res.status(200);
            // res.redirect('/profile');
            // res.render('inscription',{data:resultat[0]});
        } else {
            res.json({isloggedin : false,error : 'L\'identifiant ou le mot de passe n\'est pas bon'});
            // res.render('login',{error:'L\'identifiant ou le mot de passe n\'est pas bon'});
        }
        
        
    }
    
    profile(req,res){
         
    }

    logout(req,res){
        req.session.destroy((err) => {
            if(err) {
                return console.log(err);
            }
            res.redirect('/login');
        });
    }



    async isconnected(req,res){
        this.sess = req.session;
        console.log(this.sess);
        if(this.sess._id){
            // res.status(200);
            res.json({isloggedin : true,_id : this.sess._id});
        } else {
            res.json({isloggedin : false});
        }
        
        
        
    }
    
}

module.exports = new AuthController()
