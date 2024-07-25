const groupModel = require('../model/group')

async function getGroup(req, res,next){
    let group
    try {
         group= await groupModel.findById(req.params.id);

         if(group ==null) return res.status(500).json({message:"Group not found"})
        
        
    } catch (error) {
        return res.status(500).json({message:error})
    }

    res.group=group

    
    next()
}




async function getGroupByName(req, res,next){
    let group
    try {

        console.log("THIS IS THE RECEIVED GROUP NAME", req.params.groupName)
         group= await groupModel.findOne({"groupName":req.params.groupName});

         if(group ==null) return res.status(500).json({message:"Group not found"})
        
        
    } catch (error) {
        return res.status(500).json({message:error})
    }

    res.group=group

    
    next()
}


module.exports = {getGroup,getGroupByName}

