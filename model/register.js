const mongoose = require('mongoose')

const registrationschema = new mongoose.Schema({
    firstName:{
        type: String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required:true,
        // email:true

    },
    tel:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    dob:{
        type: String,
        required:true
    },
    selfie:{
        type: String,
        required:true
    },
    docs:{
        type: String,
        required:true
    },
    chats:{
            type: []
    },
    groups:{
            type:[],
    },
    socketId:{
        type:String
    }

})

module.exports= mongoose.model('Users',registrationschema)