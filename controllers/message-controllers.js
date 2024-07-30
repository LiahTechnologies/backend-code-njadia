
const Conversation = require("../model/conversationMode")
const groupModel = require('../model/group');
const Users = require('../model/register');

const Message = require('../model/messageModel')
const { getRecieverSocketId } = require("../socket/socket");
const { Socket } = require("socket.io");



  const sendMessage =async (req, res)=>{
  
    try {


    
        const {receiverId,message} = req.body
        const senderId = req.body.messageSender
    

        console.log(message," this is the message from group")
        // console.log(message," this is the message from group")
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
    //    await newMessage.save()
       
       Promise.all([conversation.save(), newMessage.save()])
       
       const recieverSocketId = getRecieverSocketId(receiverId)
       const senderSocketId = getRecieverSocketId(senderId)
    
       if(recieverSocketId){
           // O.to.emit is used to send  messages to specific clients
           IO.to(recieverSocketId).emit("privateChat",newMessage);
           console.log("PRIVATE CHAT SENT TO RECEIVER", recieverSocketId)
          
       }
       
       if(senderSocketId){
        IO.to(senderSocketId).emit("privateChat",newMessage);
        console.log("PRIVATE CHAT SENT TO SENDER", senderSocketId)
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
        // const user = await Users.findById(req.params.uid).select("-password")

        const {receiverId:userToChatId,uid}= req.body
        
        // const {id:userToChatId} = req.params
        const senderId = uid
         console.log("CODE REACHING THIS LEVEL", uid)

        const conversation = await Conversation.findOne({
            participants: {$all:[senderId,userToChatId]},

        }).populate("messages")

        console.log("SECOD STAGE OF REACHING CODE ",userToChatId)
        if(!conversation)
            res.status(200).json([])

        else
        res.status(200).json(conversation.messages)

    } 
    catch (error) {
        console.log(`Error in sending message ${error.message}`,)
        res.status(500).json({error:"Internal error sending message"})
    }


}






const sendGroupMessage =async (req, res)=>{

//   console.log("THE GROUP MESSAGE PART")

    try {
    
        const {message,chatId:groupId,replyMessage, replySender} = req.body

        // console.log("group message",message)

        // const { id:groupId}  = req.params

        const senderId = req.body.messageSender
   

        // console.log("User id",senderId)
           // create a message
    
       const newMessage = new Message({
           senderId,
           receiverId:groupId,
           message,
           replyMessage,
           replySender,
       })
    
        await newMessage.save()

        const messageData = await Message.findById(newMessage._id).populate("senderId","id, email, firstName, lastName")

        // console.log(newMessage)

        await groupModel.findByIdAndUpdate(groupId,{
            $push:{messages:newMessage._id}
        })

        const group= await groupModel.findById(groupId).populate("groupMembers")

        const finalData = {...messageData._doc,groupId:group._id}
        
        if(group && group.groupMembers){

            // console.log(group.groupMembers,"members")

            group.groupMembers.forEach(element => {

                // console.log("EVENT IS BEING TRIGGERED",element._id)

                const memberSocketId=getRecieverSocketId(element._id.toString())

                console.log(memberSocketId,"THIS IS THE SOCKET ID")

                if(memberSocketId){

                    console.log("SENT BACK MESSAGE IS ", newMessage)
                    // Socket.on("newGroupMessage",newMessage)

                    IO.to(memberSocketId).emit("newGroupMessage",newMessage);
                      
                }

                console.log("SENT BACK MESSAGE IS ", newMessage)
            });
        }
    // console.log(finalData,"this is the message")

    res.status(201).json(newMessage) 
    
       }
    
    catch (error) {
           console.log(`Error in sending message ${error.message}`,)
           res.status(500).json({error:"Internal sending message"})
      }

}


const fetchGroupMessage=async(req,res)=>{
    try {
        const {groupId}= req.body
        
        const messages = await
         groupModel.findById(groupId).populate("messages")

         res.send(messages.messages)

    } catch (error) {
        console.log(`Error in sending message ${error.message}`,)
           res.status(500).json({error:"Internal sending message"})
    }
}

const fetchInitalMessage= async(req, res )=>{

    try {
        const {uid,groupId}= req.body
        
       

        const  user = await Users.findById(uid)
        const group = user.groups.filter(e=>e==groupId)

        const message = await groupModel.findById(group).populate('messages')
        res.json(message.messages);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}
module.exports= {sendMessage,getMessages,sendGroupMessage,fetchGroupMessage, fetchInitalMessage}



