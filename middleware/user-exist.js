const userModel = require('../model/register')


const  checkIfYourExist =async(req, res,next)=>{
    let user
    try {
         const result = await userModel.findById(req.params.id);

         if(result ==null) return res.send({message:"User not found"})
        user=true
        //  console.log(`Current user ${users}`)
        
    } catch (error) {
        return res.status(500).json({message:error})
    }

res.user=user
next()


}

module.exports = checkIfYourExist