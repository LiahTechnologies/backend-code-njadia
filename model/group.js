const mongoose = require('mongoose')

const groupModel = new mongoose.Schema({

    groupName:{
        type: String ,
        required: true,
        unique:true
    },
    groupIcon:{
        type: String
    },
    groupMembers:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Users",
            

        }
    ],
        
    
    groupAdmins:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Users",
           
        }
    ],

    pendingApprovement:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Users",
           
        }
    ],
    groupLevy:{
        type: String,
        required : true,

    },
    messages:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Messages",
            required:false

        }
    ],

    createdAt:{
        type: Date,
        default: Date.now()
    },

    updatedAt:{
        type: Date,
        default: Date.now()
    }
})


groupModel.pre("save",function(next){
    this.updatedAt= Date.now()
    next()
})

groupModel.pre("findOneAndUpdate",function(next){
    this.set({updatedAt: Date.now()})
    next()
})

module.exports= mongoose.model('Groups',groupModel)