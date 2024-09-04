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

//**GET VALID USERS */


async function getValidMembers(groupMembersTel) {
    try {
        const validMembers = await registrationModel.findAllOrFail({ tel: { $in: groupMembersTel } });
        console.log('Valid members:', validMembers);
        return validMembers
    } catch (error) {
        console.error(error.message);
        // Handle the error (e.g., send a response to the client, log the error, etc.)
    }
}

/******************GET ALL GROUPS****************/
const CreateGroup = async(req,res)=>{
    console.log("TRYING TO CREATE GROUP");

    const {groupMembers}= req.body

    console.log("GROUP MEMBER ARE: ",groupMembers)

    const validMembers = await getValidMembers(groupMembers)
    console.log("GROUP MEMBER ARE: ",validMembers.length)

    if(validMembers.length ==0){
        return res.status(400).json({"message":"Some users are not valid users"})
    }

        console.log("VERIED USER")
    
    try {
        let groupExist = groupModel.findOne({"groupName":req.body.groupName});
        
        // console.log(groupExist)

        if(groupExist.length!=null)
            return res.status(500).json({'message':"Group Name already exist"})

        console.log("CREATING GROUP")
        let newGroup = new groupModel({
            groupName:req.body.groupName,
            groupLevy:req.body.groupLevy,
            groupIcon:req.body.profilePic,
            groupMembers:validMembers,
            groupAdmins:req.body.groupAdmins
    
        }) 

        const result = await newGroup.save()
        console.log("CREATED GROUP",result)
        
        // Adding groupId to user list of groups
        validMembers.map(async(e)=>{
            const currentUser = await registrationModel.findById(e['_id'])
            console.log(currentUser, "THIS IS THE USER")
    
            currentUser.groups =  [...currentUser.groups,result['_id']]
    
            currentUser.save()
        })
        
        console.log("RETUER RSPONSES", result)
        // console.log($result["id"], "this the current Id")
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









/** */


function generateUniqueList(n) {
    const set = new Set();
    while (set.size < n) {
        set.add(Math.floor(Math.random() * n) + 1);
    }
    return Array.from(set);
}


const generateBallotNumbers = async(req, res)=>{
    console.log("THIS IS THE GROUP ID", req.params.id)
    const group =await groupModel.findById(req.body.groupId)
    const ballotNumbers= generateUniqueList(group.groupMembers.length)

    group.ballotNumbers= ballotNumbers
    group.ballotList=[];
    
    console.log("The generated ballot number are ",group.ballotNumbers)
    group.save()

    res.send(group.ballotNumbers)

}


/**FETCH GROUP BALLOT NUMBERS */

const fetchBalloNumbers = async(req, res)=>{
    console.log("THIS IS THE GROUP ID", req.body.groupId)
    const group =await groupModel.findById(req.body.groupId)
    group.ballotList.value==req.body.uid
    const user = group.ballotList.filter((e)=>e.value==req.body.uid)
//    const user= await groupModel.findOne({"ballotList.value":req.body.uid})
   if(user.length>0)
    res.status(500).json({"message":"ballot user already exist"})

   else {
    const group =await groupModel.findById(req.body.groupId)
    res.send(group.ballotNumbers)
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
 








module.exports = {fetchBalloNumbers,deletePendingGroupJoinReques,getPendingGroupApprovals,waitingApprovement,addAdmin,joinGroup,CreateGroup,getAGroup,allGroups,deleteUserFromGroup,deleteAdminFromGroup,getGroupMembers,getGroupAdmin, getGroupMember,generateBallotNumbers}






