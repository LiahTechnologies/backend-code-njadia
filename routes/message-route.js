const express = require('express')
const sendMessage = require('../controllers/message-controllers')
const protectRoute = require('../middleware/protect_routes')
const routers = express.Router()

routers.post('/send/:id', protectRoute,sendMessage)
routers.get('/:id',protectRoute,getMessages)



module.exports=routers