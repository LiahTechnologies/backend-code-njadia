const { default: Conversation } = require("../model/conversationMode")
const { default: Message } = require("../model/messageModel")

 const sendMessage =async (req, res)=>{
   try {
     const {message} = req.body
     const {id}  = req.params
     const senderId = req.user._id

    let conservation = await Conversation.findOne({participants:{all:{senderId,recieverId}}})
    
    if(!conservation)
        conservation = await conservation.create({
    participants:[senderId,recieverId],
    message

    })

    const newMessage = new Message({
        senderId,
        recieverId,
        message
    })

    if(newMessage) Conversation.message.push(newMessage._id)

    // This approach of saving wiil take more execution time
    // await conservation.save()
    // await newMessage.save()
     
    Promise.all([Conversation.save(), newMessage.save()])

    res.status(201).json(newMessage)

} catch (error) {
        console.log(`Error in sending message ${error.message}`,)
        res.status(500).json({error:"Internal error sending message"})
   }
}



const getMessage = async (req,res)=>{
    try {
        
        const {id:userToChatId} = req.params
        const senderId = req.user._id

        const Conversation = await Conversation.findOne({
            participants: {all:{senderId,recieverId}},

        }).populate("messages")


        if(!Conversation)
            res.status(200).json([])
        res.status(200).json(Conversation.messages)

    } catch (error) {
        console.log(`Error in sending message ${error.message}`,)
        res.status(500).json({error:"Internal error sending message"})
    }
}
module.exports= sendMessage