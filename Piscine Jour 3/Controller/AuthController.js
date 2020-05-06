
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

        this.app.use( this.bodyParser.json() );
        this.app.use(this.bodyParser.urlencoded({     // to support URL-encoded bodies
            extended: true
        })); 

        this.app.set('view engine','ejs')
    }
    
    
    index(req,res){
        res.render('index');
    }

    register(req,res){

        if(req.body.password == req.body.password2){
            let data = {
                login: req.body.login,
                password: req.body.password,
                email: req.body.email,
            }


            // res.render('inscription',{data:data});
        } else {
            res.render('index',{error:'Les mots de passe ne sont pas les memes'});
        }
    }
}

module.exports = new AuthController()
