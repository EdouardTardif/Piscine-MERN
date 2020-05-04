class myMERN_module {

    static async create(name){
        let fs = require('fs')
        return new Promise(function(resolve,reject){
            fs.writeFile(name, 'oui', (err) => {
                if (err) resolve('Create '+name+': KO');
                resolve('Create '+name+': OK');
            });
        });
    }


    static async read(name){
        let fs = require('fs')
        return new Promise(function(resolve,reject){
            fs.readFile(name,'utf8', (err, data) => {
                if (err) resolve('Read '+name+': KO');
                resolve(data);
            });
        });
    }

    static async update(name,content){
        let fs = require('fs')
        return new Promise(function(resolve,reject){
            fs.writeFile(name, content, (err) => {
                if (err) resolve('Update '+name+': KO');
                resolve('Update '+name+': OK');
            });
        });
    }

    static async delete(name){
        let fs = require('fs')
        return new Promise(function(resolve,reject){
            fs.unlink(name, (err) => {
                if (err) resolve('delete '+name+': KO');
                resolve('Delete '+name+': OK');
            });
        });
    }
}

module.exports = myMERN_module
