const express = require('express')
const protectRoute = require('../middleware/protect_routes')
const chat_user_routes = express.Router()

chat_user_routes.get('/',protectRoute,getUserForSidebar)



module.exports = chat_user_routes