// require('dotenv').config()
const express      = require('express')
const cookieParser = require('cookie-parser')
const dotenv       = require('dotenv')
const PORT         = process.env.PORT||5000
const {app,server} = require('./socket/socket')


const UsersRouter             = require('./routes/users')
const UsergroupRoutes         = require('./routes/group-chats')
const UserchatsRouters        = require('./routes/user-chats')
const messageRoute            = require('./routes/message-route');
const chatListRoutes          = require('./routes/chat-user')
const authRoute               = require('./routes/auth_route')
const connectToMongoDb        = require('./db/connect')
const fileRouter              = require('./routes/upload-file')



dotenv.config()


app.use(express.json())
app.use(cookieParser())


app.use("/api/users",        UsersRouter)
app.use('/api/messages',     messageRoute)
app.use('/api/chat-list',    chatListRoutes)
app.use('/api/auth',         authRoute)


app.use('/api/groups',       UsergroupRoutes)
app.use('/api/user-chats',   UserchatsRouters)

app.use('/api/files', fileRouter)



server.listen(PORT,()=>{
  connectToMongoDb()
  console.log(process.env.SPACES_ENPOINT,"THIS IS THE BUNKET NAME")
})




