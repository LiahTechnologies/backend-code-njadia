const express = require('express')
const protectRoute = require('../middleware/protect_routes')
const routers = express.Router()
const {sendMessage,getMessages}= require("../controllers/message-controllers")


routers.post('/send/:id', protectRoute,sendMessage)      
routers.get('/:id',protectRoute,getMessages)



module.exports = routers