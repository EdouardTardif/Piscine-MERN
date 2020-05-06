db.createCollection( "users", {
    validator: { $jsonSchema: {
       bsonType: "object",
       required: [ "login","password","email","type" ],
       properties: {
            login: {
                bsonType: "string",
                unique: true,
                description: "must be a string and is required"
            },
            password: {
                bsonType: "string",
                description: "must be a string and is required"
            },
            email: {
                bsonType : "string",
                unique: true,
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