// const Server = require('socket.io')
const groupModel = require('../model/group');

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
    socket.on('privateMessage', (data) => {
      const { content, sender, recipient } = data;
      const message = new Message({ content, sender, recipient });
      message.save((err) => {
        if (err) return console.error(err);
        if (users[recipient]) {
          io.to(users[recipient]).emit('privateMessage', message);
        }
        io.to(users[sender]).emit('privateMessage', message);
      });
    });
  


    // Group messaging
    socket.on('joinGroup', (group) => {
      socket.join(group);
      console.log(`User joined group: ${group}`);
    });
  


    socket.on('groupMessage', async (data) => {
      console.log("sent message",data)
      const { message, messageSender:senderId, chatId:receiverId } = data;
      const content =  await new Message({ message, senderId, receiverId});
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
                  socket.emit("OnGroup",finalData)
                  socket.to(memberSocketId).emit("OnGroup",finalData);
                  console.log("message emitted", finalData)
                    
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