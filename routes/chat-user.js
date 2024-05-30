const express           = require('express')
const protectRoute      = require('../middleware/protect_routes')
const chat_List_routes  = express.Router()
const getUserForSidebar = require('../controllers/chat_list_controller')

chat_List_routes.get('/',protectRoute,getUserForSidebar)



module.exports = chat_List_routes