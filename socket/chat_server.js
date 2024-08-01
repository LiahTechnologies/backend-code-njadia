// const express = require('express');
// const db = require('../db_connection')
// const http = require('http');
// const socketIo = require('socket.io');
// const MongoClient = require('mongodb').MongoClient;
// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// // const mongoURI = 'mongodb://localhost:27017/chatApp';


// const groupMembers = {
//     // 'group1': [userID1, userID2,],
//     // 'group2': [userID3, userID4, ],
//     // ...
// };



// function sendMessageToGroup(groupID, message) {
//     const memberUserIDs = groupMembers[groupID] || [];
//     memberUserIDs.forEach(userID => {
//         const socketID = userSockets[userID];
//         if (socketID) {
//             io.to(socketID).emit('message', message);
//         }
//     });
// }

// const userSockets = {};
// function sendMessageToUser(userID, message) {
//     const socketID = userSockets[userID];
//     if (socketID) {
//         // Send message to the user's socket
//         io.to(socketID).emit('message', message);
//     } else {
//         console.log(`User ${userID} is not connected.`);
//     }
// }



//     // Socket.io connections
//     io.on('connection', (socket) => {
//         console.log(`User connected ${socket.id}` );


//     // Handle authentication and obtain userID
//     // const userID = authenticateUser(socket);

//     // Associate socket with userID
//     // userSockets[userID] = socket.id;

//         // Join a room
//         socket.on('joinGroup', (room) => {
//             socket.join(room);
//             socket.to("4JfG0MYfIf5h3VlEAAAD").emit(JSON.stringify(room))
//             console.log(`User joined room: ${JSON.stringify(room)}`);
//         });

//         // Handle group messages
//         socket.on('groupMessage', async (data) => {
//             io.to(data.room).emit('groupMessage', data);
//             console.log(`Group message in room ${data.room}: ${data.message}`);

//             // Save message to MongoDB
//             await db.collection('messages').insertOne(data);
//         });

//         // // Handle private messages
//         // socket.on('privateMessage', (data) => {
//         //     io.to(data.room).emit('privateMessage', data);
//         //     console.log(`Private message from ${data.from} to ${data.to}: ${data.message}`);

//         //     // Save message to MongoDB
//         //     // db.collection('messages').insertOne(data);
//         // });



//         // Private chat

//         socket.on('join', (userId) => {
//             socket.join("userId");
//             console.log(`User ${userId} joined private chat`);
//         });

//         socket.on('privateMessage', async (data) => {
//             const { chatId, message } = data;
//             io.to("chatId").emit('privateMessage', { message });
//             console.log(`Private message from  to  ${message}`);

//             // Save message to MongoDB
//         });



//         // Disconnect event
//         socket.on('disconnect', () => {
//             console.log('User disconnected');
//         });
//     });


// server.listen(3001, () => {
//     console.log('Server running on port 3001');
// });





















// // server.js
// // const express = require('express');
// // const http = require('http');
// // const socketIo = require('socket.io');
// // const MongoClient = require('mongodb').MongoClient;

// // const app = express();
// // const server = http.createServer(app);
// // const io = socketIo(server);

// // const mongoURI = 'mongodb://localhost:27017/chatApp';
// /*
// MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
//     if (err) {
//         console.error('Error connecting to MongoDB:', err);
//         return;
//     }

//     console.log('Connected to MongoDB');
//     const db = client.db('chatApp');

//     io.on('connection', (socket) => {
//         console.log('User connected');

//         socket.on('join', (userId) => {
//             socket.join(userId);
//             console.log(`User ${userId} joined private chat`);
//         });

//         socket.on('privateMessage', async (data) => {
//             const { from, to, message } = data;
//             io.to(to).emit('privateMessage', { from, message });
//             console.log(`Private message from ${from} to ${to}: ${message}`);

//             // Save message to MongoDB
//             await db.collection('privateMessages').insertOne(data);
//         });

//         socket.on('disconnect', () => {
//             console.log('User disconnected');
//         });
//     });
// });

// server.listen(3000, () => {
//     console.log('Server running on port 3000');
// });*/
