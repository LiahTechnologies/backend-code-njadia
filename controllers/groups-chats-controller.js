const express = require('express')
const groupRoutes = express.Router()
const groupModel = require('../model/group');
const { updateDetails } = require('./user-controller');
const registrationModel = require('../model/register');
const getUser = require("../middleware/get-user")


/**********ADD ADMINS TO GROUP********** */

const addAdmin = async(req,res)=>{
    if(req.body.userId!=null){

        let checkResult= res.group.groupAdmins.filter(e=>e==req.body.userId)

        if(checkResult!=null || checkResult!=undefined)
            return res.json({"message":"Admin already exist"})
        else{
            res.group.groupAdmins=[
                ... res.group.groupAdmins,
                req.body.userId
            ];
        }
       
    }

    try {
        const updateResult = await res.group.save()
        res.json(updateResult)
        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}



const waitingApprovement = async(req,res)=>{
    if(req.body.userId!=null){

        let checkResult= res.group.pendingApprovement.filter(e=>e==req.body.userId)

        if(checkResult.length>0)
            return res.json({"message":"User already exist"})
        else{
            res.group.pendingApprovement=[
                ... res.group.pendingApprovement,
                req.body.userId
            ];
        }
       
    }

    try {
        const updateResult = await res.group.save()
        
        if(updateResult.length!=0)
            res.status(200).json({"message":true})
        else
         res.status(200).json({"message":false})
        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}




/**********ADD USER TO GROUP********** */

const joinGroup =  async(req,res)=>{ 
    let checkResult=null
            if(req.body.userId!=null){
                // check if user exist

                    checkResult= res.group.groupMembers.filter(e=>e==req.body.userId)
                    // console.log("NEW USER IS ", checkResult.length==0)
                    if(checkResult.length==0){
                        res.group.groupMembers=[
                            ... res.group.groupMembers,
                            req.body.userId
                        ];

                      
                    // Removing user from pending list

                    res.group.pendingApprovement=res.group.pendingApprovement.filter(e=>e!=req.body.userId)


                    }
                       
                    else{
                        return res.json({"message":"User already exist"})
                    }
                    

              

            }

        console.log("CODE IS REACHING HEAR")
        const currentUser = await registrationModel.findById(req.body.userId)
        
        console.log(currentUser, "THIS IS THE USER")
        
        currentUser.groups =  [...currentUser.groups,req.params.id]

        currentUser.save()



            // let resp = getUser(req.body.userId);

            // resp.users.chats = [...resp.users.chats,req.body.userId]

            // resp.users.save()



            try {
                const updatedResult = await res.group.save()
                // return res.send(updatedResult)
                if(updatedResult.length!=0)
                    res.status(200).json({"message":true})
                else
                 res.status(200).json({"message":false})
                   
            } catch (error) {
                return res.status(500).json({message:error.message})
            }
}




/******************GET ALL GROUPS****************/
const CreateGroup = async(req,res)=>{

    console.log("TRYING TO CREATE GROUP");

    const {groupMembers}= req.body

    console.log("TRYING TO CREATE GROUP");

    const validMembers = await registrationModel.find({_id:{$in:groupMembers}})

    if(validMembers.length !==groupMembers.length){
        return res.status(400).json({"message":"Some users are not valid users"})
    }

        console.log("VERIED USER")
    
    try {
        let groupExist = groupModel.findOne({"groupName":req.body.groupName});
        
        console.log(groupExist)

        if(groupExist.length!=null)
            return res.status(500).json({'message':"Group Name already exist"})

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
 

/************GET Group Members**************/

const getGroupMembers=async(req,res)=>{

    try {
     
       const members =await groupModel.findById(req.params.id).populate("groupMembers")
     res.send(members.groupMembers)
     
    } catch (error) {
 
     return res.status(500).json({message:error.message})
    }
}
 



/************GET Pending Group  Members**************/

const getPendingGroupApprovals=async(req,res)=>{

    try {
     
       const members =await groupModel.findById(req.params.id).populate("pendingApprovement")
     res.send(members.pendingApprovement)
     
    } catch (error) {
 
     return res.status(500).json({message:error.message})
    }
}
 



/***************** */
const getGroupMember=async(req,res)=>{

    try {
     let result = res.group.groupMembers.find(e=>e==req.body.id)
      
       res.send(result)
     
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
 




/************DELETE Pending GROUP Join Reques**************/

const deletePendingGroupJoinReques=async(req,res)=>{

    try {
     if(req.body.userId!=null){
        res.group.pendingApprovement= await res.group.pendingApprovement.filter(userId=>userId!=req.body.userId)
       
     }
 
     const response = await res.group.save()
     res.send(response)
     
    } catch (error) {
 
     return res.status(500).json({message:error.message})
    }
}
 








module.exports = {deletePendingGroupJoinReques,getPendingGroupApprovals,waitingApprovement,addAdmin,joinGroup,CreateGroup,getAGroup,allGroups,deleteUserFromGroup,deleteAdminFromGroup,getGroupMembers,getGroupAdmin, getGroupMember}






