const express = require('express')
const groupRoutes = express.Router()
const { deleteAdminFromGroup, deleteUserFromGroup, getAllGroup, getAGroup, allGroups, CreateGroup, joinGroup, addAdmin, getGroupMembers, getGroupAdmin, getGroupMember, waitingApprovement, getPendingGroupApprovals, deletePendingGroupJoinReques, generateBallotNumbers, fetchBalloNumbers } = require('../controllers/groups-chats-controller');
const {getGroup,getGroupByName} = require('../middleware/get-user-group');

/**********ADD ADMINS TO GROUP********** */
groupRoutes.patch("/admins/:id", getGroup,addAdmin)

/**********ADD USER TO GROUP********** */

groupRoutes.patch("/members/:id", getGroup,joinGroup)


/**********WAITING FOR APPROVEMENT********** */

groupRoutes.patch("/approval/:id", getGroup,waitingApprovement)


/******************CREATE  GROUPS****************/
groupRoutes.post('/',CreateGroup)


/*************GET A GROUP Member************ */
groupRoutes.post('/member/:id',getGroup,getGroupMember)



/**GENERATE BALLOTE NUMBERS */

groupRoutes.post('/generate-ballots', generateBallotNumbers)



/*********FETCH BALLOT NUMBERS *******/

groupRoutes.post('/fetch-ballots', fetchBalloNumbers)

/*****************GET ALL GROUP*********/

groupRoutes.get('/',allGroups)


/*************GET A GROUP************ */
groupRoutes.get('/:groupName',getGroupByName,getAGroup)

/**********GET WAITING FOR APPROVEMENT********** */

groupRoutes.get("/approval/:id", getGroup,getPendingGroupApprovals)


/************Get USER FROM  A GROUP**************/

groupRoutes.get('/members/:id',getGroupMembers)


/************Get ADMIN FROM GROUP**************/

groupRoutes.get('/admins/:id',getGroup,getGroupAdmin)

    





/************DELETE USER FROM  A GROUP**************/

groupRoutes.delete('/members/:id',getGroup,deleteUserFromGroup)


/************DELETE ADMIN FROM GROUP**************/

groupRoutes.delete('/admins/:id',getGroup,deleteAdminFromGroup)

/************DELETE ADMIN FROM GROUP**************/

groupRoutes.delete('/approval/:id',getGroup,deletePendingGroupJoinReques)

    




module.exports = groupRoutes






