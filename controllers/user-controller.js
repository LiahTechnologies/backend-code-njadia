const registrationModel = require('../model/register');


const getAllUser = async(req,res)=>{
    try {
        const users = await registrationModel.find();
        res.send(users)
     } catch (error) {
        return res.status(500).json({message:error.message})
     }
  
}



const User = async(req,res)=>{
    res.send(res.users)
}

const userByEmail = async(req,res)=>{
    const user = registrationModel.findOne({email:req.body.email});
   res.send(user)
}

const updateUserName = async(req,res)=>{
    if(req.body.firstName!=null){
        res.users.firstName=req.body.firstName
     }
  
     if(req.body.lastName!=null){
        res.users.lastName=req.body.lastName
     }
  
     try {
  
        console.log(`this is  ${res.users}`)
        const updatedUser = await res.users.save()
  
        res.json(updatedUser)
     } catch (error) {
        return res.status(500).json({message:error.message})
     }
}


const deleteUser = async(req,res)=>{
    try {
        await res.users.remove()
        return res.send({message:"User removed"})
       } catch (error) {
           return res.status(500).json({message:error.message})
       }
}


const deleteAll = async(req,res)=>{
    const result= registrationModel.deleteMany();

}

const userChats = async(req,res)=>{
    const result = res.users.chats.populate("Users")

    res.send(result)
}

const userGroups = async(req,res)=>{
    const result = res.users.chats.populate("groups")

    res.send(result)
}

module.exports= {getAllUser,User,userByEmail,updateUserName,deleteUser,deleteAll,userChats,userGroups}