const {MongoClient} = require('mongodb');
const express = require('express');


// db.createUser(
//     {
//       user: "root",
//       pwd: "root",
//       roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
//     }
// )
async function main(){
    const uri = "mongodb://localhost:27017/mern-piscine";
    const client = new MongoClient(uri,{useUnifiedTopology: true});
    // await client.connect();
    // await listDatabases(client);
    try {
        await client.connect();
    
        console.log('Connection Reussi');
    } catch (e) {
        console.log('Connection failed')
        console.error(e);

    } finally {
        await client.close();
    }
}
main().catch(console.error);
