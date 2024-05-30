// const Server = require('socket.io')
const http = require('http')
const express = require('express')
const socketIo = require('socket.io');
const app = express()
const server = http.createServer(app);
// const io = socketIo(server);
const IO =  socketIo(server,{
    cors:{
        origin:['*'],
        methods:['"GET','POST']
    }
})

const getRecieverSocketId=(recieverId)=>{
    return userSocketMap[recieverId];
}

const userSocketMap ={}

IO.on('connection',(socket)=>{
    
    const userId = socket.handshake.query.userId

    if(userId != undefined) userSocketMap[userId]=socket.id

    // IO.emit  is used to send an event on all connected clients



    IO.emit("getOnlineUSer", Object.keys(userSocketMap))

    socket.on('disconnect',()=>{
        console.log("User disconnected", socket.id);
        delete userSocketMap[userId]
        IO.emit("getOnlineUSe", Object.keys(userSocketMap))

    })
})

module.exports = {app,IO,server,getRecieverSocketId}