
class BoutiqueController {

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

        this.app.set('view engine','ejs')

        this.AuthModel = require('../Model/AuthModel.js');
        this.BoutiqueModel = require('../Model/BoutiqueModel.js');
    }


    async showall(req,res){
        this.sess = req.session;
        if(this.sess._id){
            let products = await this.BoutiqueModel.fetchall('products');
            res.render('showall',{products:products});


        } else {
            res.redirect('/login');
        }
    }
    async show(req,res){
        let id = req.params.id;
        console.log(id);
        this.sess = req.session;
        if(this.sess._id){
            let products = await this.BoutiqueModel.test({_id:this.ObjectId(id)},'products');
            res.render('produit',{product:products[0]});

        } else {
            res.redirect('/login');
        }
    }
    
    
}

module.exports = new BoutiqueController()
