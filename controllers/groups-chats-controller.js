const express = require('express')
const groupRoutes = express.Router()
const groupModel = require('../model/group')

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

            try {
                const updateResult = await res.group.save()
                res.json(updateResult)
                
            } catch (error) {
                return res.status(500).json({message:error.message})
            }
}




/******************GET ALL GROUPS****************/
const CreateGroup = async(req,res)=>{
    
    let newGroup = new groupModel({
        groupName:req.body.groupName,
        groupLevy:req.body.groupLevy,
        groupIcon:req.body.groupIcon,
        groupMembers:req.body.groupMembers,
        groupAdmins:req.body.groupAdmins

    })

    try {
        const result = await newGroup.save()

        res.status(201).json(result)
        
    } catch (error) {
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






