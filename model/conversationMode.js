import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema({
    participants:[
        {
            type:mongoose.Schema.types.ObjectId,
            ref:"User"
        }
    ],
    messages:[
        {
            type:mongoose.Schema.types.ObjectId,
            ref:"User",
            defualt:[]
        }
    ]
},{timestamps:true})


const Conversation = mongoose.model("Conversation",ConversationSchema)
export default Conversation