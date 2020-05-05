db.createCollection( "students", {
    validator: { $jsonSchema: {
       bsonType: "object",
       required: [ "id,lastname,fisrtname,email,phone,validated,admin" ],
       properties: {
            id: {
                bsonType: "int",
                description: "must be an int and is required"
            },
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
                pattern : "^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$",
                description: "must be a string and match the regular expression pattern"
            },
            phone: {
                bsonType : "int",
                pattern : "^0[1-6]{1}(([0-9]{2}){4})|((\s[0-9]{2}){4})|((-[0-9]{2}){4})$",
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