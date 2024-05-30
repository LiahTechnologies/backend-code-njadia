const JWT  = require("jsonwebtoken")
const User = require("../model/register")

const protectRoute = async(req, res, next)=>{

    try {
        const token = req.cookies.jwt
        if(!token)
            return res.status(401).json({message:"Unauthorized user- No token provided"})

        const decode = JWT.verify(token, process.env.JWT_SECRET)
        if(!decode){
            return res.status(401).json({message:"Unauthorized invalid token"})
        }


        const user = await User.findById(decode.userId).select("-password")

        if(!user)
            return res.status(404).json({message:"User does not exist"})

        req.user = user

       

        next()

    } catch (error) {
        console.log("Error in route middelware ", error.message)
        res.status(500).json({message:"Internal error"})
    }
}

module.exports =protectRoute