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

const updateDetails = async(req,res)=>{


    if(req.body.firstName!=null){
        res.users.firstName=req.body.firstName
     }
  

     if(req.body.lastName!=null){
        res.users.lastName=req.body.lastName
     }


     if(req.body.email!=null){
        res.users.email=req.body.email
     }


    //  if(req.body.chats!=null){
    //     res.users.chats=[...res.users.chats,req.body.chats]
    //  }


    //  if(req.body.groups!=null){
    //     res.users.groups=[...res.users.groups,req.body.groups]
    //  }


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
    const result = await registrationModel.findById(req.params.id).populate('chats');

    res.send(result.chats)
}

const userGroups = async(req,res)=>{
    const result = await registrationModel.findById(req.params.id).populate('groups');

    // const result =  await res.users.populate('groups')
    console.log(result,"users and groups" )
    res.send(result.groups)
}

module.exports= {getAllUser,User,userByEmail,updateDetails,deleteUser,deleteAll,userChats,userGroups}