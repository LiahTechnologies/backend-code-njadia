const getUserForSidebar = async(req,res)=>{
    try {
        const loggedInUserId = res.user._id

        const allDatabaseUser = await UserActivation.find({_id:{$ne:loggedInUserId}}).select(".password")
        res.status(200).json(allDatabaseUser)
    } catch (error) {
        console.log(`Error in sending message ${error.message}`,)
        res.status(500).json({error:"Internal error sending message"})
    }
}