 
const mongoose = require('mongoose')

 const messageSchema = new  mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,

        // type: mongoose.Schema.type.ObjectId,
        ref:"Users",
        required: true
    },
    receiverId:{
        // type: String,

        type: mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required: true
    },
    messageSender:{
            type:String,
    },
    messageReceiver:{
        type:String
    },

    message:{
        type: String,
        required: true
    },
    replySender:{
            type: String
    },

    replyMessage:{
        type: String
    }
 },{timestamp:true});


 module.exports = mongoose.model("Messages",messageSchema);
 