const express = require('express')

const fileroute = express.Router()


const {uploadFile,sigupFiles, upload} = require('../controllers/upload-file')



const uploadFields = upload.fields([
    { name: 'selfie', maxCount: 1 }, // Handle single selfie file
    { name: 'docs', maxCount: 1 },
    { name: 'profilePic', maxCount: 1} // Handle up to 5 document files
  ]);

const uploadField = upload.fields([
    { name: 'file', maxCount: 1 }, // Handle single selfie file
  ]);


fileroute.post("/signup-file",uploadFields,sigupFiles)
fileroute.post("/upload-file",uploadField,uploadFile)


module.exports = fileroute