
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');


// Load environment variables
dotenv.config();






const s3 = new AWS.S3({
  endpoint: process.env.SPACES_ENPOINT,
  accessKeyId: process.env.SPACES_KEY,
  secretAccessKey: process.env.SPACES_SECRET,
});




const { S3Client } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');








const s3Client = new S3Client({
  endpoint: process.env.SPACES_ENPOINT, // Replace 'nyc3' with your region
  region: 'nyc3', // Replace with your region
  credentials: {
    accessKeyId: process.env.SPACES_KEY,
    secretAccessKey: process.env.SPACES_SECRET,
  },
});

// Configure multer for handling file uploads
const upload = multer({ storage: multer.memoryStorage() });

// const upload = multer({ storage: storage });

// Configure AWS SDK for DigitalOcean Spaces
// const spacesEndpoint = new AWS.Endpoint(process.env.SPACES_ENDPOINT);




// Define the fields to handle


const sigupFiles=  async (req, res) => {


    try {



        const files = req.files;
        const uploadPromises = [];

      
    
        if (files.selfie) {
          const selfieFile = files.selfie[0];
          const selfieKey = `signup/${uuidv4()}-${selfieFile.originalname}`;
    
          console.log("UPLOADING SELFIE", selfieKey)
          uploadPromises.push(
            new Upload({
              client: s3Client,
              params: {
                Bucket: process.env.SPACES_BUCKET, // Replace with your DigitalOcean Space name
                Key: selfieKey,
                Body: selfieFile.buffer,
                ACL: 'public-read',
              },
            }).done()
          );
        }
    
        if (files.docs) {
          const docsFile = files.docs[0];
          const docsKey = `signup/${uuidv4()}-${docsFile.originalname}`;
          
          console.log("UPLOADING DOCS", docsKey)

          uploadPromises.push(
            new Upload({
              client: s3Client,
              params: {
                Bucket: process.env.SPACES_BUCKET, // Replace with your DigitalOcean Space name
                Key: docsKey,
                Body: docsFile.buffer,
                ACL: 'public-read',
              },
            }).done()
          );
        }
    console.log("fILE ARE BEING UPLOADED", uploadPromises)
        // Wait for all uploads to finish
        const results = await Promise.all(uploadPromises);
        console.log("THIS IS THE RESULT FORM THE UPLOAD", results)
      res.status(200).json({ "selfie":results[0].Location,"docs":results[1].Location });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }

    
  };
  



  // Route to handle file upload
const uploadFile   = async (req, res) => {

  try {
    

      console.log("UPLOADING SINGLE FILE")

      const files = req.files;
      const uploadPromises = [];
  

      if (files.file) {
        const file = files.file[0];
        const fileKey = `${req.body.folder}/${uuidv4()}-${file.originalname}`;

        uploadPromises.push(
          new Upload({
            client: s3Client,
            params: {
              Bucket: process.env.SPACES_BUCKET, // Replace with your DigitalOcean Space name
              Key: fileKey,
              Body: file.buffer,
              ACL: 'public-read',
            },
          }).done()
        );
      }


      const results = await Promise.all(uploadPromises);

      console.log("SERVER RESPONSE ",results)

      res.status(200).json({ "file":results[0].Location });

  } catch (error) {
    console.log("ERROR UPLOADING FILE ",error.message)
  }


  };
  


module.exports = {uploadFile,sigupFiles,upload}
