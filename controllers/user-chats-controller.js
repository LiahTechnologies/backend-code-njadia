const express = require('express')

const userModel = require('../model/register')
const unique = require('../utils/create_a_set')
// const unique = require('../utils/create_a_set')
const chatsRouters = express.Router()


/**********ADD NEW CHAT ********** */
const addNewchat= async(req,res)=>{
    // console.log(res.users.groups)
  

    try {

        if(req.body.userId!=null){

            res.users.chats=unique( [
                ...res.users.chats,
                req.body.userId
            ])
        
        }

        const updateResult = await res.users.save()
        res.json(updateResult)
        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}


/**********ADD NEW GROUP ********** */
const addNewGroup= async(req,res)=>{
    // console.log(res.users.groups)
  

    try {

        if(req.body.groupId!=null){

            res.users.groups=unique([
                ...res.users.groups,
                req.body.groupId
            ])
            
        }

        const updateResult = await res.users.save()
        res.json(updateResult)
        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}


/*************GET A CHATS************ */
const getAllChats = async(req,res)=>{
  
        
       res.send(res.users.chats)

}



const getAChat = async(req,res)=>{
  
    const user = res.users.chats.filter(user=>user==req.body.user_id)
        
    res.send(user)

}


/************DELETE A GROUP **************/
const getAGroup = async(req,res)=>{
  
    const group = res.users.groups.filter(group=>group==req.body.group_id)
        
    res.send(group)

}

/************DELETE A USER GROUPS **************/
const getUserGroups = async(req,res)=>{
     
    res.send(res.users.groups)

}


/************DELETE A CHAT **************/
const deleteChat = async(req,res)=>{

   try {
    if(req.body.userId!=null){
        res.users.chats= await res.users.chatss.filter(userId=>userId!=req.body.userId)
      
    }

    const response = await res.users.save()
    
    res.send(response)
   } catch (error) {

    return res.status(500).json({message:error.message})
   }
}






module.exports = {addNewchat,getAllChats,deleteChat,getAChat,getUserGroups,getAGroup,addNewGroup}