db.createCollection( "users", {
    validator: { $jsonSchema: {
       bsonType: "object",
       required: [ "login","password","email","type" ],
       properties: {
            login: {
                bsonType: "string",
                pattern:"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]{5,20}$",
                description: "must be a string and is required"
            },
            password: {
                bsonType: "string",
                description: "must be a string and is required"
            },
            email: {
                bsonType : "string",
                pattern : "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$",
                description: "must be a string and match the regular expression pattern"
            },
            type: {
                bsonType: "bool",
                description: "must be a bool and is required"
            }
        }
    }}
})

db.users.createIndex({"login":1},{unique:true})
db.users.createIndex({"email":1},{unique:true})


db.createCollection( "products", {
    validator: { $jsonSchema: {
       bsonType: "object",
       required: [ "titre","prix","description" ],
       properties: {
            titre: {
                bsonType: "string",
                description: "must be a string and is required"
            },
            prix: {
                bsonType: "string",
                pattern : "^[0-9]+$",
                description: "must be a string and is required"
            },
            description: {
                bsonType : "string",
                description: "must be a string and match the regular expression pattern",
            },
        }
    }}
})

db.users.createIndex({"login":1},{unique:true})
db.users.createIndex({"email":1},{unique:true})