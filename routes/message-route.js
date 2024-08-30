const express = require('express')
const protectRoute = require('../middleware/protect_routes')
const routers = express.Router()
const {sendMessage,getMessages,sendGroupMessage,fetchGroupMessage, fetchInitalMessage,fetchLastMessage}= require("../controllers/message-controllers")
const getUser = require('../middleware/get-user')


routers.post('/send/:uid',sendMessage)      
routers.post('/',getMessages)
routers.post('/group/send/',sendGroupMessage)
routers.post('/group/',fetchGroupMessage)
routers.post('/init',fetchInitalMessage)
routers.post('/lastMessage',fetchLastMessage)



module.exports = routers