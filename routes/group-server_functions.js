const express = require('express')
const groupRoutes = express.Router()
const groupModel = require('../model/group')

/**********ADD ADMINS TO GROUP********** */
groupRoutes.patch("/admins/:id", getGroup,async(req,res)=>{
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
})




/**********ADD USER TO GROUP********** */

groupRoutes.patch("/members/:id", getGroup,async(req,res)=>{
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
})




/******************GET ALL GROUPS****************/
groupRoutes.post('/',async(req,res)=>{
    
    let newGroup = new groupModel({
        groupName:req.body.groupName,
        groupLevy:req.body.groupLevy,
        groupcon:req.body.groupIcon,
        groupMembers:req.body.groupMembers,
        groupAdmins:req.body.groupAdmins

    })

    try {
        const result = await newGroup.save()

        res.status(201).json(result)
        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }

})

/*************GET A GROUP************ */
groupRoutes.get('/:id',getGroup,async(req,res)=>{
  
        
       res.send(res.group)

})



/*****************GET ALL GROUP MEMBERS**********/

groupRoutes.get('/',async(req,res)=>{
    try {
        
        const groups = await groupModel.find();
    res.send(groups)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
})




/************DELETE USER FROM GROUP**************/

groupRoutes.delete('/members/:id',getGroup,async(req,res)=>{

   try {
    if(req.body.userId!=null){
        res.group.groupMembers= await res.group.groupMembers.filter(userId=>userId!=req.body.userId)
      
    }

    const response = await res.group.save()
    
    res.send(response)
   } catch (error) {

    return res.status(500).json({message:error.message})
   }
})


/************DELETE USER FROM GROUP**************/

groupRoutes.delete('/admins/:id',getGroup,async(req,res)=>{

    try {
     if(req.body.userId!=null){
        res.group.groupAdmins= await res.group.groupAdmins.filter(userId=>userId!=req.body.userId)
       
     }
 
     const response = await res.group.save()
     res.send(response)
     
    } catch (error) {
 
     return res.status(500).json({message:error.message})
    }
 })
 


// MIDDLEWARES


async function getGroup(req, res,next){
    let group
    try {
         group= await groupModel.findById(req.params.id);

         if(group ==null) return res.status(500).json({message:"Group not found"})
        
        
    } catch (error) {
        return res.status(500).json({message:error})
    }

    res.group=group

    
    next()
}




module.exports = groupRoutes






