// const registrationschema = require('../model/register')
const { response } = require('express')
const registrationModel = require('../model/register')
const generateTokenSetCookie = require('../utils/generate_token')
const Bcrypt = require('bcryptjs')
const { use } = require('../routes/group-chats')
const upload = require('./upload-file')


const signup = async (req,res)=>{

   
   
    const salt = await Bcrypt.genSalt(10)
    const hashpass = await Bcrypt.hash(req.body.password,salt)

    const newUser =  new registrationModel({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        profilePic: req.body.profilePic,
        email:req.body.email,
        tel:req.body.tel,
        dob:req.body.dob,
        password:hashpass,
        selfie:req.body.selfie,
        docs:req.body.selfie,
        // socketId:req.body.socketId

    })

    

    
    try {

       

        
        if(newUser){
            // console.log("THE CURREN PAYLOAD IS ",newUser._id)
             generateTokenSetCookie(newUser._id,res)

             const activeUser=   await newUser.save()
             const {_id,firstName,lastName, email,tel,profilePic}=activeUser
             const user_info={
                "userId":_id,
                "firstName":firstName,
                "lastName":lastName,
                "email":email,
                "tel":tel,
                "profilePic":profilePic,
                "token":"token.jwt"

             }
             res.status(201).json(user_info)
        }

   
    } catch (error) {
        if(error.message.includes("duplicate key")){
            res.status(409).json({"error":"Email already exist"})
        }

        console.log("Error in sign up controller", error.message)

        res.status(400).json({message:error.message})
    }
}




const login =async (req,res)=>{
    const {email, password}=req.body

    try {

     

      
        console.log(`USER EMAIL IS ${req.body.email},`)
        
        const user = await registrationModel.findOne({"email":email})
        console.log(user)

        const isPasswordCorrect = await Bcrypt.compare(password,user?.password || "")
        console.log(`user password status ${isPasswordCorrect}`)
        if(!user || !isPasswordCorrect) return res.status(400).json({error:"Invalid user data"})

       generateTokenSetCookie(user._id,res)

        // console.log("the token is ",  response.token)

        console.log("login user", user)
        res.status(200).json({
            userId:user._id,
            firstName:user.firstName,
            lastName:user.lastName,
            email:user.email,
            tel:user.tel,
            profilePic:user.profilePic,
            token:"token.token"


        })


    } catch (error) {


        console.log("Error in login controller", error.message)
        res.status(500).json({message:"internal server error"})
    }

}



const logout =async (req,res)=>{
    try {

        res.cookie('jwt','',{message:0})
        res.status(200).json({message:"Logged out successfully"})

    } catch (error) {

        console.log("Error in logout controller", error.messagee)
        res.status(500).json({message:"internal server error"})

    }
}

module.exports = {signup,login, logout}