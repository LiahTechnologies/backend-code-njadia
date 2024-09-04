// const Server = require('socket.io')
const groupModel = require('../model/group');
const Conversation = require("../model/conversationMode")


const http = require('http')
const express = require('express')
const socketIo = require('socket.io');
const app = express()
const server = http.createServer(app);
const Message = require('../model/messageModel')

// const io = socketIo(server);
const io =  socketIo(server,{
    cors:{
        origin:['*'],
        methods:['"GET','POST']
    }
})

const getRecieverSocketId=(recieverId)=>{
    return users[recieverId];
}

const userSocketMap ={}

let users = {};


const groupMembers = {
    // 'group1': [userID1, userID2,],
    // 'group2': [userID3, userID4, ],
    // ...
};


io.on('connection',(socket)=>{ 

  console.log("CONNECTION IS BEING CALLED")
    
    const userId = socket.handshake.query.userId

    console.log("connected user id",userId)
    console.log("connected user socket id",socket.id)

    if(userId != undefined) users[userId]=socket.id

    // IO.emit  is used to send an event on all connected clients

    

    io.emit("getOnlineUSer", Object.keys(users))

    socket.on('disconnect',()=>{
        console.log("User disconnected", socket.id);
        delete users[userId]
        io.emit("getOnlineUSe", Object.keys(users))

    })



    // Join a room
    socket.on('joinGroup', (room) => {
        socket.join(room);
        socket.to("4JfG0MYfIf5h3VlEAAAD").emit(JSON.stringify(room))
        console.log(`User joined room: ${JSON.stringify(room)}`);
    });








    console.log('New client connected');

    socket.on('register', (username) => {
      users[userId] = socket.id;
      console.log(`User registered: ${username}`);
    });
  

    // Fetch initial messages from MongoDB
    Message.find().sort({ timestamp: -1 }).limit(10).exec((err, messages) => {
        if (err) return console.error(err);
        socket.emit('initialMessages', messages);
    });


    // Private messaging
    socket.on('privateMessage', async(data) => {
        console.log("PRIVATE CHAT ",data)
      const {chatId:receiverId,message, messageSender:senderId}=data 
      
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
           io.to(recieverSocketId).emit("privateChat",newMessage);
           console.log("PRIVATE CHAT SENT TO RECEIVER", recieverSocketId)
          
       }
       
       if(senderSocketId){
        io.to(senderSocketId).emit("privateChat",newMessage);
        console.log("PRIVATE CHAT SENT TO SENDER", senderSocketId)
       }






      // const { content, sender, recipient } = data;
      // const message = new Message({ content, sender, recipient });
      // message.save((err) => {
      //   if (err) return console.error(err);
      //   if (users[recipient]) {
      //     io.to(users[recipient]).emit('privateMessage', message);
      //   }
      //   io.to(users[sender]).emit('privateMessage', message);
      // });



    });
  


    // Group messaging
    socket.on('joinGroup', (group) => {
      socket.join(group);
      console.log(`User joined group: ${group}`);
    });
  


    // Group messaging
    socket.on('selectballote', async(data) => {
        const {uid, groupId, value}= data
        const group = await groupModel.findById(groupId);
        const input = {key:value,value:uid}
        group.ballotNumbers=group.ballotNumbers.filter((number)=>number!=value)

        group.ballotList=[...group.ballotList,input]



        group.groupMembers.forEach(element => {

          console.log("EVENT IS BEING TRIGGERED",element._id)

          console.log("CONNECTED USERS",users)

          const memberSocketId=getRecieverSocketId(element._id.toString())
          

          if(memberSocketId){
              // socket.emit("OnGroup",content)
              socket.to(memberSocketId).emit("ballots",group.ballotNumbers);
              console.log("message emitted", group.ballotNumbers)
                
          }
      })
        return  group.save()

    });

    socket.on('groupMessage', async (data) => {
      console.log("sent message",data)
      const { message, messageSender,senderId, receiverId, messageReceiver,replyMessage, replySender ,time} = data;

      const content =  await new Message({ message, senderId, receiverId,messageSender, messageReceiver,replySender, replyMessage,time});
      
      await content.save(async(err) => {

        if (err) return console.error(err);


        const messageData = await Message.findById(content._id).populate("senderId","id, email, firstName, lastName")

        

        await groupModel.findByIdAndUpdate(receiverId,{
            $push:{messages:content._id}
        })

        const group= await groupModel.findById(receiverId).populate("groupMembers")

        const finalData = {...messageData._doc,groupId:group._id}
        
        if(group && group.groupMembers){

          console.log(group.groupMembers,"members")


          group.groupMembers.forEach(element => {

              console.log("EVENT IS BEING TRIGGERED",element._id)

              console.log("CONNECTED USERS",users)

              const memberSocketId=getRecieverSocketId(element._id.toString())
              
              console.log(memberSocketId,"THIS IS THE SOCKET ID")

              if(memberSocketId){
                  // socket.emit("OnGroup",content)
                  socket.to(memberSocketId).emit("OnGroup",content);
                  console.log("message emitted", content)
                    
              }
          });
      }
         
           // io.to(group).emit('groupMessage', message);

      });
    });
  
    socket.on('disconnect', () => {
      console.log('Client disconnected');
      // Remove the user from the users object
      for (let username in users) {
        if (users[username] === socket.id) {
          delete users[username];
          break;
        }
      }
    });

})



module.exports = {app,io,server,getRecieverSocketId}