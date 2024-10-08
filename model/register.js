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
        unique:true

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
    profilePic:{
            type:String,
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
    chats:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Users'
        }
    ],
    groups:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Groups'
        }
    ]
            
   

})



// Add a static method to the schema
registrationschema.statics.findAllOrFail = async function(query) {
    const result = await this.find(query);
    if (result.length === 0) {
        return []
    }
    return result;
};



module.exports= mongoose.model('Users',registrationschema)
