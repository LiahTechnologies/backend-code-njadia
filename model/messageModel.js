 
const mongoose = require('mongoose')

 const messageSchema = new  mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,

        // type: mongoose.Schema.type.ObjectId,
        ref:"User",
        required: true
    },
    receiverId:{
        // type: String,

        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },

    message:{
        type: String,
        required: true
    }
 },{timestamp:true});


 const Message = mongoose.model("messages",messageSchema);
 module.exports = Message;