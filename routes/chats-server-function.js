const express = require('express')

const userModel = require('../model/register')
const chatsRouters = express.Router()

chatsRouters.get('/:id',getUser,(req,res)=>{
    console.log("SENT ID IS", req.params.id)
       res.send(res.users)
 })

/**********ADD ADMINS TO GROUP********** */
chatsRouters.patch("/chats/:id", getUser,async(req,res)=>{
    if(req.body.userId!=null){

        res.users.chats=[
            ... res.users.chats,
            req.body.userId
        ];
    }

    try {
        const updateResult = await res.users.save()
        res.json(updateResult)
        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
})




/**********ADD USER TO GROUP********** */

chatsRouters.patch("/groups/:id", getUser,async(req,res)=>{
            if(req.body.userId!=null){

                res.users.groups=[
                    ... res.users.groups,
                    req.body.userId
                ];
            }

            try {
                const updateResult = await res.users.save()
                res.json(updateResult)
                
            } catch (error) {
                return res.status(500).json({message:error.message})
            }
})




/******************GET ALL GROUPS****************/
// chatsRouters.post('/',async(req,res)=>{
    
//     let newGroup = new userModel({
//         groupName:req.body.groupName,
//         groupLevy:req.body.groupLevy,
//         groupcon:req.body.groupIcon,
//         groupMembers:req.body.groupMembers,
//         groupAdmins:req.body.groupAdmins

//     })

//     try {
//         const result = await newGroup.save()

//         res.status(201).json(result)
        
//     } catch (error) {
//         return res.status(500).json({message:error.message})
//     }

// })

/*************GET ALL CHATS************ */
chatsRouters.get('/chats/:id',getUser,(req,res)=>{
  
        
       res.send(res.users.chats)

})



/*****************GET ALL GROUP **********/

chatsRouters.get('/groups/:id',getUser,async(req,res)=>{
    try {
        
        const groups = await res.users.groups
    res.send(groups)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
})




/************DELETE USER FROM GROUP**************/

chatsRouters.delete('/chats/:id',getUser,async(req,res)=>{

   try {
    if(req.body.userId!=null){
        res.users.chats= await res.users.chatss.filter(userId=>userId!=req.body.userId)
      
    }

    const response = await res.users.save()
    
    res.send(response)
   } catch (error) {

    return res.status(500).json({message:error.message})
   }
})


/************DELETE USER FROM GROUP**************/

chatsRouters.delete('/groups/:id',getUser,async(req,res)=>{

    try {
     if(req.body.userId!=null){
        res.users.groups= await res.users.groups.filter(userId=>userId!=req.body.userId)
       
     }
 
     const response = await res.users.save()
     res.send(response)
     
    } catch (error) {
 
     return res.status(500).json({message:error.message})
    }
 })
 




// MIDDLEWARES


async function getUser(req, res,next){
    let users
    try {
         const result = await userModel.find(req.body.id);

         if(result ==null) return res.send({message:"Group not found"})
        users=result
        
    } catch (error) {
        return res.status(500).json({message:error})
    }

res.users=users
next()


}


// export function updateUserDetails(userId)async{ 
    

//         res.users.chats=[
//             ... res.users.chats,
//             userId
//         ];
    

//     try {
//         const updateResult = await res.users.save()
//         res.json(updateResult)
        
//     } catch (error) {
//         return res.status(500).json({message:error.message})
//     }
// }
module.exports = chatsRouters