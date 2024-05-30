const mongoose = require('mongoose')

const ConversationSchema = new mongoose.Schema({
    participants:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Users"
        }
    ],
    messages:[
      {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Messages",
            defualt:[]
        }
    ]
},{timestamps:true})


module.exports = mongoose.model("Conversation",ConversationSchema)
