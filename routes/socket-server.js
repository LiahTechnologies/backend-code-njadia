// const { Socket } = require('socket.io')
// const { use } = require('./chats-server-function')

// var app = require('express')()
// var server = require('http').Server(app)
// var io = require('socket.io')(server,{
//   cors:{
//     origin:['*']
//   }
// })



// io.on('connection', function(socket) {

//   console.log(`user id is ${socket.id}`)
//   // Join a group

//     socket.on("joinRoom",(roomId)=>{
//       socket.join()
//       socket.to(roomId).emit(joinGroup(socket.id))
//     })


//   // Add to group

//   socket.on("addToGroup",(userId, groupName)=>{
//     socket.to(userId).emit(`${socket.id} add you to ${groupName}`)
//   })



//   // Send a message to the group
 
//     socket.on('sendMessage',(msg,roomId)=>{

      
//       socket.to(roomId).emit(msg)
       
//       });


//   // send message

//     socket.on("message",(msg)=>{
//       socket.to("q_pZADaTW2S6_IAAAAH").emit(msg)
//       console.log(`THE MESSAGE SENT IS  ${msg}`)
//     })
   

  
//   })


// const joinGroup =(userId,)=>{
//   userId,
//   "Joined group"
// }


// function makeid(length=20) {
//   let result = '';
//   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   const charactersLength = characters.length;
//   let counter = 0;
//   while (counter < length) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     counter += 1;
//   }
//   return result;
// }


// const updatUserDetails=()=>{
  
// }

// // server.listen(5000,"192.168.0.108")
// // server.listen(5000,"192.168.100.197")

// // server.listen(5000,"192.168.30.98")



// module.exports =server