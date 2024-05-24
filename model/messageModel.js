 import { Timestamp } from "mongodb";
import mongoose from "mongoose";

 const messageSchema = new  mongoose.Schema({
    senderId:{
        type: mongoose.Schema.type.objectId,
        ref:"User",
        required: true
    },
    recieverId:{
        type: mongoose.Schema.type.objectId,
        ref:"User",
        required: true
    },

    message:{
        type: String,
        required: true
    }
 },{timestamp:true});


 const Message = mongoose.model("message",messageSchema);
 export default Message;