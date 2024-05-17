const { Socket } = require('socket.io')

var app = require('express')()
var server = require('http').Server(app)
var io = require('socket.io')(server,{
  cors:{
    origin:['*']
  }
})



io.on('connection', function(socket) {
 
    socket.on('sendMessage',(msg,roomId)=>{
      
      socket.to(roomId).emit(msg)
       
      });



    secket.on("message",(msg))
   

})





// server.listen(5000,"192.168.0.108")
// server.listen(5000,"192.168.100.197")

// server.listen(5000,"192.168.30.98")



module.exports =server