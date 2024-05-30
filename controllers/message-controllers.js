
const Conversation = require("../model/conversationMode")
const Message = require('../model/messageModel')
const { getRecieverSocketId } = require("../socket/socket")

  const sendMessage =async (req, res)=>{
  
    try {
    
        const {message} = req.body
        const { id:receiverId}  = req.params
        const senderId = req.user._id
    
       //  find conversiation between users
    
       let conversation = await Conversation.findOne({participants: {$all: [senderId, receiverId] }, })
        
       if(!conversation){ 
    
           conversation = await Conversation.create({
           participants:[senderId,receiverId]
    
       // message [ this is not necessary because the default will be empty]
           })}
    
    
           // create a message
    
       const newMessage = new Message({
           senderId,
           receiverId,
           message
       })
    
       if(newMessage) conversation.messages.push(newMessage._id)
    
       // This approach of saving wiil take more execution time
       // await conservation.save()
       // await newMessage.save()
       
       Promise.all([conversation.save(), newMessage.save()])
       
       const recieverSocketId = getRecieverSocketId(receiverId)
    
       if(recieverSocketId){
           // O.to.emit is used to send  messages to specific clients
           IO.to(recieverSocketId).emit("newMessage",newMessage);
       }
       
       res.status(201).json(newMessage)
    
       }
    
    catch (error) {
           console.log(`Error in sending message ${error.message}`,)
           res.status(500).json({error:"Internal sending message"})
      }

}



 const getMessages = async (req,res)=>{


    try {
        
        const {id:userToChatId} = req.params
        const senderId = req.user._id

        const conversation = await Conversation.findOne({
            participants: {$all:[senderId,userToChatId]},

        }).populate("messages")


        if(!conversation)
            res.status(200).json([])

        
        res.status(200).json(conversation.messages)

    } 
    catch (error) {
        console.log(`Error in sending message ${error.message}`,)
        res.status(500).json({error:"Internal error sending message"})
    }


}

module.exports= {sendMessage,getMessages}



