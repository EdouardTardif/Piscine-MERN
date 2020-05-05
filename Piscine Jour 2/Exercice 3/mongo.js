db.createCollection( "students", {
    validator: { $jsonSchema: {
       bsonType: "object",
       required: [ "lastname","firstname","email","phone","validated","admin" ],
       properties: {
            lastname: {
                bsonType: "string",
                description: "must be a string and is required"
            },
            firstname: {
                bsonType: "string",
                description: "must be a string and is required"
            },
            email: {
                bsonType : "string",
                pattern : "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$",
                description: "must be a string and match the regular expression pattern"
            },
            phone: {
                bsonType : "string",
                pattern : "^[0]{1}[0-9]{9}$",
                description: "must be an int and match the regular expression pattern"
            },
            validated: {
                enum: [ "in progress", "validated" , "rejected"],
                description: "can only be one of the enum values"
            },
            admin: {
                bsonType: "bool",
                description: "must be a bool and is required"
            }
        }
    }}
})