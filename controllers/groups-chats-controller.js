const express = require('express')
const groupRoutes = express.Router()
const groupModel = require('../model/group');
const { updateDetails } = require('./user-controller');
const registrationModel = require('../model/register');


/**********ADD ADMINS TO GROUP********** */

const addAdmin = async(req,res)=>{
    if(req.body.userId!=null){

        res.group.groupAdmins=[
            ... res.group.groupAdmins,
            req.body.userId
        ];
    }

    try {
        const updateResult = await res.group.save()
        res.json(updateResult)
        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}




/**********ADD USER TO GROUP********** */

const joinGroup =  async(req,res)=>{
            if(req.body.userId!=null){

                res.group.groupMembers=[
                    ... res.group.groupMembers,
                    req.body.userId
                ];

            }

        const currentUser = await registrationModel.findById(req.body.userId)
        console.log(currentUser, "THIS IS THE USER")
        currentUser.chats =  [...currentUser.chats,result['_id']]

        currentUser.save()

            let resp = getUser(req.body.userId);

            resp.users.chats = [...resp.users.chats,req.body.userId]

            resp.users.save()

            try {
                const updateResult = await res.group.save()
                res.json(updateResult)
                
            } catch (error) {
                return res.status(500).json({message:error.message})
            }
}




/******************GET ALL GROUPS****************/
const CreateGroup = async(req,res)=>{
    const {groupMembers}= req.body



    const validMembers = await registrationModel.find({_id:{$in:groupMembers}})

    if(validMembers.length !==groupMembers.length){
        return res.status(400).json({"message":"Some users are not valid users"})
    }


    
    try {

        let newGroup = new groupModel({
            groupName:req.body.groupName,
            groupLevy:req.body.groupLevy,
            groupIcon:req.body.groupIcon,
            groupMembers:req.body.groupMembers,
            groupAdmins:req.body.groupAdmins
    
        }) 

        const result = await newGroup.save()
        console.log(result, "this the current result")
        
        const currentUser = await registrationModel.findById(req.body.groupAdmins)
        console.log(currentUser, "THIS IS THE USER")
        currentUser.groups =  [...currentUser.groups,result['_id']]

        currentUser.save()
        console.log($result["id"], "this the current Id")
        res.status(201).json(result)
        
    } catch (error) {
        console.log("GROUP CREATE ERROR MESSAGE",error.message.toString())
        return res.status(500).json({message:error.message})
    }

}

/*************GET A GROUP************ */
const getAGroup= async(req,res)=>{
  
        
       res.send(res.group)

}



/*****************GET ALL GROUP MEMBERS**********/

const allGroups = async(req,res)=>{
    try {
        
        const groups = await groupModel.find();
    res.send(groups)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}



/************GET Group Admin**************/

const getGroupAdmin=async(req,res)=>{

    try {
     
       
     res.send(res.group.groupAdmins)
     
    } catch (error) {
 
     return res.status(500).json({message:error.message})
    }
}
 

/************GET Group Admin**************/

const getGroupMembers=async(req,res)=>{

    try {
     
       
     res.send(res.group.groupMembers)
     
    } catch (error) {
 
     return res.status(500).json({message:error.message})
    }
}
 


/************DELETE USER FROM GROUP**************/

const deleteUserFromGroup =async(req,res)=>{

   try {
    if(req.body.userId!=null){
        res.group.groupMembers= await res.group.groupMembers.filter(userId=>userId!=req.body.userId)
   
        
    }

    const response = await res.group.save()
    
    res.send(response)
   } catch (error) {

    return res.status(500).json({message:error.message})
   }
}


/************DELETE Admin FROM GROUP**************/

const deleteAdminFromGroup=async(req,res)=>{

    try {
     if(req.body.userId!=null){
        res.group.groupAdmins= await res.group.groupAdmins.filter(userId=>userId!=req.body.userId)
       
     }
 
     const response = await res.group.save()
     res.send(response)
     
    } catch (error) {
 
     return res.status(500).json({message:error.message})
    }
}
 









module.exports = {addAdmin,joinGroup,CreateGroup,getAGroup,allGroups,deleteUserFromGroup,deleteAdminFromGroup,getGroupMembers,getGroupAdmin}






