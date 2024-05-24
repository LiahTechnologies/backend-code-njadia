const mongoose = require('mongoose')

const groupModel = new mongoose.Schema({

    groupName:{
        type: String ,
        required: true
    },
    groupIcon:{
        type: String
    },
    groupMembers:{
        type: []
    },
    groupAdmins:{
        type: []
    },
    groupLevy:{
        type: String,
        required : true
    }
})


module.exports= mongoose.model('groups',groupModel)