const express = require('express')

const { getAChat, addNewchat, deleteChat, getUserChats, getUserGroups, getAGroup, addNewGroup, deleteGroup } = require('../controllers/user-chats-controller')
const getUser = require('../middleware/get-user')
const checkIfYourExist = require("../middleware/user-exist")
const chatsRouters = express.Router()



/*************GET ALL CHATS************ */
chatsRouters.get('/:id',checkIfYourExist,getUserChats)

//All User chats Chats

// chatsRouters.get('/chats/:id',getUser,userChats)


// All User Groups

// chatsRouters.get('/groups/:id',userGroups)


/**********ADD NEW CHAT********** */
chatsRouters.patch("/chats/:id", getUser,addNewchat)

/**********ADD NEW CHAT********** */
chatsRouters.patch("/groups/:id", getUser,addNewGroup)


/*************GET A CHATS************ */
chatsRouters.post('/chats/:id',getUser,getAChat)


/************DELETE A CHAT **************/

chatsRouters.delete('/chats/:id',getUser,deleteChat)
chatsRouters.delete('/groups/:id',getUser,deleteGroup)


/*************GET ALL USER GROUPS************ */
chatsRouters.get('/groups/:id',getUser,getUserGroups)



/*************GET A USER GROUPS************ */
chatsRouters.post('/group/:id',getUser,getAGroup)


module.exports = chatsRouters