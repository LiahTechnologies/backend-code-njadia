const express = require('express')
const routers = express.Router()
const registrationModel = require('../model/register')


// Get all users 
routers.get('/',async(req,res)=>{

   try {
      const users = await registrationModel.find();
      res.send(users)
   } catch (error) {
      return res.status(500).json({message:error.message})
   }

})

// Get single users

routers.get('/:id',getUser,(req,res)=>{
   console.log("SENT ID IS", req.params.id)
      res.send(res.currentUser)
})


routers.get('/:email', async(req,res)=>{
   const user = registrationModel.findOne({email:req.body.email});
   res.send(user)
})
// create user

routers.post('/',async(req,res)=>{

   const newUser = new registrationModel({
         firstName:req.body.firstName,
         lastName:req.body.lastName,
         email:req.body.email,
         tel:req.body.tel,
         dob:req.body.dob,
         password:req.body.password,
         selfie:req.body.selfie,
         docs:req.body.selfie,
         socketId:req.body.socketId
 
     })
      try {
         
 
      const activeUser=   await newUser.save()
        res.status(201).json(activeUser)
      } catch (error) {
         res.status(400).json({message:error.message})
      }
})


// update user

routers.patch('/:id',getUser,async(req,res)=>{
   if(req.body.firstName!=null){
      res.currentUser.firstName= req.body.firstName
   }

   if(req.body.lastName!=null){
      res.currentUser.lastName= req.body.lastName
   }

   try {
      const updatedUser = await res.currentUser.save()
      res.json(updatedUser)
   } catch (error) {
      return res.status(500).json({message:error.message})
   }
})


// delete  a user

routers.delete('/:id',getUser,async(req,res)=>{

  try {
   await res.currentUser.remove()
   return res.send({message:"User removed"})
  } catch (error) {
      return res.status(500).json({message:error.message})
  }
})


// Delete all users

routers.delete('/',(req,res)=>{
  const result= registrationModel.deleteMany();
  
})




// Middlewares

/*
async function validation(req, res , next){
    let status
    const newUser = new registrationModel({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        tel:req.body.tel,
        dob:req.body.dob,
        password:req.body.password,
        selfie:req.body.selfie,
        docs:req.body.selfie

    })
     try {
        

     const activeUser=   await newUser.save()
        status= res.status(201).json(activeUser)
     } catch (error) {
        status=res.status(400).json({message:error.message})
     }
res.status= status
     next()
}

*/

async function getUser(req, res, next){
   let currentUser
   try {
         console.log("THIS IS THE USER ID",req.params.id)
       currentUser =  await registrationModel.findById(req.params.id)
      if(currentUser==null) return res.status(500).json({message:"User doesn't exist"})
         
   } catch (error) {
      return res.status(500).json({message:error.message})
      
   }
   res.currentUser=currentUser
   next()
}

module.exports = routers