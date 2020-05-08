
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


        this.app.use( this.bodyParser.json() );
        this.app.use(this.bodyParser.urlencoded({     // to support URL-encoded bodies
            extended: true
        })); 

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
                this.sess = req.session;
                this.sess._id = resultat[0]._id;
                this.sess.email = resultat[0].email;
                this.sess.login = resultat[0].login;
                this.sess.admin = resultat[0].type;
                res.status(200).json({isloggedin : true,error : []});
                // res.redirect('/profile');
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
            this.sess = req.session;
            this.sess._id = resultat[0]._id;
            this.sess.email = resultat[0].email;
            this.sess.login = resultat[0].login;
            this.sess.admin = resultat[0].type;
            res.json({isloggedin : true});
            // res.status(200);
            // res.redirect('/profile');
            // res.render('inscription',{data:resultat[0]});
        } else {
            res.json({isloggedin : false,error : 'L\'identifiant ou le mot de passe n\'est pas bon'});
            // res.render('login',{error:'L\'identifiant ou le mot de passe n\'est pas bon'});
        }
        
        
    }
    
    profile(req,res){
        this.sess = req.session;
        if(this.sess._id){
            res.status(200);
            res.render('inscription',{data:this.sess});
        } else {
            res.redirect('/login');
        }
        
    }

    logout(req,res){
        req.session.destroy((err) => {
            if(err) {
                return console.log(err);
            }
            res.redirect('/login');
        });
    }



    async test(req,res){
        console.log(req.body);
        res.json({isloggedin : true});
        
        
        
    }
    
}

module.exports = new AuthController()
