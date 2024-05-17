// require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express')


const app = express()


mongoose.connect('mongodb://localhost:27017/njangi', { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;

// Event handling for MongoDB connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});



app.use(express.json())



const registrationRouter= require('./routes/registration')
const groupRoutes       = require('./routes/group-server_functions')
const chatsRouters= require('./routes/chats-server-function')
const socketrouter= require('./routes//socket_server')




app.use("/users",registrationRouter)
app.use('/groups',groupRoutes)
app.use('/user',chatsRouters)
// app.use('/socket',socketrouter)







app.listen(3000,()=>console.log("Working "))


