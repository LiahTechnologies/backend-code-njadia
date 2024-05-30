 const JWT = require('jsonwebtoken')

 const generateTokenSetCookie = (userId, res)=>{
    const token = JWT.sign({userId}, process.env.JWT_SECRET,{
        expiresIn:"15d",
    })

    res.cookie('jwt',token,{
        maxAge:15*24*60*60*1000,
        httpOnly:true,//prevent XSS attacks
        sameSite:"strict", // CSRR attacks cross-site request forgery attacks
        secure: process.env.NODE_MODE !='development'
    })
 }


 module.exports = generateTokenSetCookie