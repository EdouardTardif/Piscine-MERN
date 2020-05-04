class myMERN_module {

    static create(name){
        this.fs = require('fs')
        // this.fs.writeFile(name,'test',function(err){
        //     console.log('Create '+name+': KO')
        // })
        // console.log('Create '+name+': OK')
        this.fs.writeFile(name, 'oui', (err) => {
            if (err) return ('Create '+name+': KO');
            return('Create '+name+': OK');
        });
    }


    static async read(name){
        this.fs = require('fs')
        this.fs.readFile(name,'utf8', (err, data) => {
            if (err) return ('Read '+name+': KO');
            return(data);
        });
    }

    static update(name,content){
        this.fs = require('fs')
        this.fs.writeFile(name, content, (err) => {
            if (err) return ('Update '+name+': KO');
            return('Update '+name+': OK');
        });
    }

    static delete(name){
        this.fs = require('fs')
        this.fs.unlink(name, (err) => {
            if (err) return ('delete '+name+': KO');
            return ('Delete '+name+': OK');
        });
    }
}

module.exports = myMERN_module
