const express = require('express')
const routers = express.Router()
const getUser = require('../middleware/get-user');
const { getAllUser, User, userByEmail, updateUserName, deleteAll, deleteUser, userChats, userGroups, updateDetails } = require('../controllers/user-controller');
// const getUser = require('../middleware/get-user');


// Get all users 
routers.get('/',getAllUser)

// Get single users

routers.get('/:id',getUser,User)


routers.get('/:email', userByEmail)



// update user

routers.patch('/:id',getUser,updateDetails)


// delete  a user

routers.delete('/:id',getUser,deleteUser)


// Delete all users

routers.delete('/',deleteAll)



//All User chats Chats

routers.get('/chats/:id',getUser,userChats)


// All User Groups

routers.get('/groups/:id',userGroups)

// routers.get('/groups/:id',getUser,userGroups)


module.exports = routers