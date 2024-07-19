const express = require('express')
const protectRoute = require('../middleware/protect_routes')
const routers = express.Router()
const {sendMessage,getMessages,sendGroupMessage,fetchGroupMessage, fetchInitalMessage}= require("../controllers/message-controllers")
const getUser = require('../middleware/get-user')


routers.post('/send/', protectRoute,sendMessage)      
routers.get('/',protectRoute,getMessages)
routers.post('/group/send/',sendGroupMessage)
routers.post('/group/',fetchGroupMessage)
routers.post('/init',fetchInitalMessage)



module.exports = routers