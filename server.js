// require('dotenv').config()
const express = require('express')
const cookieParser = require('cookieparser')

const PORT = process.env.PORT||5000
const app = express()


// require('dotenv').config()
const mongoose = require('mongoose');
// const express = require('express')

// const PORT = process.env.PORT||5000
// const app = express()


mongoose.connect('mongodb://172.17.0.2:27017/njangi', { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;

// Event handling for MongoDB connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB successfully');
});






app.use(express.json())
app.use(cookieParser())



const registrationRouter= require('./routes/registration')
const groupRoutes       = require('./routes/group-server_functions')
const chatsRouters= require('./routes/chats-server-function')
const messageRoute= require('./routes/message-route');
const charUserRoutes = require('./routes/chat-user')
// const CookieParser = require('cookieparser');




app.use("/users",registrationRouter)
app.use('/groups',groupRoutes)
app.use('/user',chatsRouters)
app.use('/api/messages',messageRoute)
app.user('/chat-user',charUserRoutes)







app.listen(3000,()=>console.log("Working "))


module.exports= db


