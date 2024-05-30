const userModel = require('../model/register')


const  getUser =async(req, res,next)=>{
    let users
    try {
         const result = await userModel.findById(req.params.id);

         if(result ==null) return res.send({message:"User not found"})
        users=result
        //  console.log(`Current user ${users}`)
        
    } catch (error) {
        return res.status(500).json({message:error})
    }

res.users=users
next()


}


module.exports = getUser