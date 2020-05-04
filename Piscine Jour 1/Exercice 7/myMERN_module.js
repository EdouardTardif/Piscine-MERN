class myMERN_module {

    static create(name){
        this.fs = require('fs')
        // this.fs.writeFile(name,'test',function(err){
        //     console.log('Create '+name+': KO')
        // })
        // console.log('Create '+name+': OK')
        this.fs.writeFile(name, 'oui', (err) => {
            if (err) throw ('Create '+name+': KO');
            console.log('Create '+name+': OK');
        });
    }


    static read(name){
        this.fs = require('fs')
        this.fs.readFile(name,'utf8', (err, data) => {
            if (err) throw ('Read '+name+': KO');
            console.log(data);
        });
    }

    static update(name,content){
        this.fs = require('fs')
        this.fs.writeFile(name, content, (err) => {
            if (err) throw ('Update '+name+': KO');
            console.log('Update '+name+': OK');
        });
    }

    static delete(name){
        this.fs = require('fs')
        this.fs.unlink(name, (err) => {
            if (err) throw ('delete '+name+': KO');
            console.log('Delete '+name+': OK');
        });
    }
}

module.exports = myMERN_module
