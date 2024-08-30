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

    ballotList: {
        type: [{
            key: {
                type: String,
                
            },
            value: {
                type: String,
                
            }
        }],

        validate: {
            validator: function(v) {
                const keys = v.map(pair => pair.key);
                return keys.length === new Set(keys).size;
            },
            message: 'Keys must be unique within keyValuePairs.'
                 },
   },

   ballotNumbers:[
        {
            type: String
        }
   ],

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