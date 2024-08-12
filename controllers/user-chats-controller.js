const express = require('express')

const userModel = require('../model/register')
const unique = require('../utils/create_a_set')
// const unique = require('../utils/create_a_set')
const chatsRouters = express.Router()


/**********ADD NEW CHAT ********** */
const addNewchat= async(req,res)=>{
    // console.log(res.users.groups)
  

    try {

        if(req.body.userId!=null){

            // check if user exist
            console.log("THIS THE RECEIPIENT ID ",req.body.userId)
            const chatExist = res.users.chats.filter((e)=> e==req.body.userId)
            console.log(" the value of user exist", chatExist)
            if(chatExist.length>0) return res.status(500).json({"message":false})


                // Add chats to both users chat list

            res.users.chats=unique( [
                ...res.users.chats,
                req.body.userId
            ])

            // add chats  

            const receiver = await userModel.findById(req.body.userId);
            
            receiver.chats=unique([
                ...receiver.chats,
                res.users._id
            ])

           await receiver.save()
        }

        const updateResult = await res.users.save()
        console.log("THIS THE NEW CHAT", updateResult)

        if(updateResult)
            res.status(500).json({"message":true})
        else
            res.status(500).json({"message":false})
        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}


/**********ADD NEW GROUP ********** */
const addNewGroup= async(req,res)=>{
    // console.log(res.users.groups)
  

    try {

        if(req.body.groupId!=null){

            res.users.groups=unique([
                ...res.users.groups,
                req.body.groupId
            ])
            
            
        }

        const updateResult = await res.users.save()
        res.json(updateResult)
        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}


/*************GET A CHATS************ */
const getUserChats = async(req,res)=>{
    let data
        if(res.user){

         data =   await userModel.findById(req.params.id).populate("chats","-groups")
        
        console.log("THE USER IS DATA", data)
        }
       res.send(data.chats)


}



const getAChat = async(req,res)=>{
  
    const user = res.users.chats.filter(user=>user==req.body.user_id)
        
    res.send(user)

}


/************DELETE A GROUP **************/
const getAGroup = async(req,res)=>{
  
    const group = res.users.groups.filter(group=>group==req.body.group_id)
        
    res.send(group)

}

/************DELETE A USER GROUPS **************/
const getUserGroups = async(req,res)=>{
/*

    try {
        // Create a readable stream
        const userStream = new Readable({
          read() {}
        });
    
        // Fetch users and push data to the stream
        const cursor = userModel.find({}).cursor();
    
        cursor.on('data', (user) => {
          // Format user data as JSON and push to the stream
          const userJson = JSON.stringify({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            tel: user.tel,
            dob: user.dob,
            groups: user.groups // Assuming `groups` is already a list of objects or IDs in your model
          });
    
          userStream.push(userJson + '\n'); // Add newline to separate JSON objects
        });
    
        cursor.on('end', () => {
          userStream.push(null); // End the stream
        });
    
        // Set the response header for streaming
        res.setHeader('Content-Type', 'application/json');
    
        // Pipe the userStream to the response
        userStream.pipe(res);
    
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while streaming users.' });
      }
*/
    /*
    res.setHeader('Content-Type', 'application/json');

    const result = await userModel.findById(req.params.id).populate('groups').cursor();

    result.on('data',(data)=>{
        res.write(JSON.stringify(data) +'\n')
    })

    result.on('close',()=>{
        res.end()
    })

    result.on('error', (err) => {
        res.status(500).send('Error occurred: ' + err.message);
      });


      req.on('close', () => {
        if (!result.isClosed) {
            result.close(); // Manually close the cursor if the request closes prematurely
        }
      });*/



      
     const result = await userModel.findById(req.params.id).populate('groups');

  
    res.send(result.groups)

}


/************DELETE A CHAT **************/
const deleteChat = async(req,res)=>{

   try {
    if(req.body.users!=null){
        res.users.chats= await res.users.chats.filter(userId=>req.body.users.includes(userId))
      
    }

    const response = await res.users.save()
    
    res.send(response)
   } catch (error) {

    return res.status(500).json({message:error.message})
   }
}

const deleteGroup = async(req,res)=>{

    try {
     if(req.body.groups.length>0){
         res.users.groups= await res.users.groups.filter(groupId=>req.body.groups.includes(groupId))
       console.log("THE CODE ")
     }
 
     const response = await res.users.save()
     
     res.send(response)
    } catch (error) {
 
     return res.status(500).json({message:error.message})
    }
 }






module.exports = {addNewchat,getUserChats,deleteChat,deleteGroup,getAChat,getUserGroups,getAGroup,addNewGroup}