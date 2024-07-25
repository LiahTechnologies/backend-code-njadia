const express = require('express')
const groupRoutes = express.Router()
const { deleteAdminFromGroup, deleteUserFromGroup, getAllGroup, getAGroup, allGroups, CreateGroup, joinGroup, addAdmin, getGroupMembers, getGroupAdmin, getGroupMember } = require('../controllers/groups-chats-controller');
const {getGroup,getGroupByName} = require('../middleware/get-user-group');

/**********ADD ADMINS TO GROUP********** */
groupRoutes.patch("/admins/:id", getGroup,addAdmin)




/**********ADD USER TO GROUP********** */

groupRoutes.patch("/members/:id", getGroup,joinGroup)




/******************CREATE  GROUPS****************/
groupRoutes.post('/',CreateGroup)

/*************GET A GROUP************ */
groupRoutes.get('/:groupName',getGroupByName,getAGroup)




/*************GET A GROUP Member************ */
groupRoutes.post('/member/:id',getGroup,getGroupMember)





/*****************GET ALL GROUP*********/

groupRoutes.get('/',allGroups)



/************Get USER FROM  A GROUP**************/

groupRoutes.get('/members/:id',getGroup,getGroupMembers)


/************Get ADMIN FROM GROUP**************/

groupRoutes.get('/admins/:id',getGroup,getGroupAdmin)

    


/************DELETE USER FROM  A GROUP**************/

groupRoutes.delete('/members/:id',getGroup,deleteUserFromGroup)


/************DELETE ADMIN FROM GROUP**************/

groupRoutes.delete('/admins/:id',getGroup,deleteAdminFromGroup)

    




module.exports = groupRoutes






