
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






const sigupFiles = async (req, res) => {
  try {
    const files = req.files;
    const uploadPromises = [];

    if (files.selfie) {
      const selfieFile = files.selfie[0];
      const selfieKey = `signup/${uuidv4()}-${selfieFile.originalname}`;
      
      console.log("UPLOADING SELFIE", selfieKey);
      
      const selfieUploadPromise = new Upload({
        client: s3Client,
        params: {
          Bucket: process.env.SPACES_BUCKET, 
          Key: selfieKey,
          Body: selfieFile.buffer,
          ACL: 'public-read',
        },
      })
      .done()
      .then(data => {
        const url = `${process.env.SPACES_ENPOINT}/${process.env.SPACES_BUCKET}/${selfieKey}`;
        console.log("Uploaded selfie URL:", url);
        return { type: 'selfie', url };
      })
      .catch(err => {
        console.error("Error uploading selfie:", err);
        throw err;
      });

      uploadPromises.push(selfieUploadPromise);
    }

    if (files.profilePic) {
      const profilePicFile = files.profilePic[0];
      const profilePicKey = `signup/${uuidv4()}-${profilePicFile.originalname}`;
      
      console.log("UPLOADING PROFILE PIC", profilePicKey);
      
      const profilePicUploadPromise = new Upload({
        client: s3Client,
        params: {
          Bucket: process.env.SPACES_BUCKET, 
          Key: profilePicKey,
          Body: profilePicFile.buffer,
          ACL: 'public-read',
        },
      })
      .done()
      .then(data => {
        const url = `${process.env.SPACES_ENPOINT}/${process.env.SPACES_BUCKET}/${profilePicKey}`;
        console.log("Uploaded profile pic URL:", url);
        return { type: 'profilePic', url };
      })
      .catch(err => {
        console.error("Error uploading profile pic:", err);
        throw err;
      });

      uploadPromises.push(profilePicUploadPromise);
    }

    if (files.docs) {
      const docsFile = files.docs[0];
      const docsKey = `signup/${uuidv4()}-${docsFile.originalname}`;
      
      console.log("UPLOADING DOCS", docsKey);

      const docsUploadPromise = new Upload({
        client: s3Client,
        params: {
          Bucket: process.env.SPACES_BUCKET, 
          Key: docsKey,
          Body: docsFile.buffer,
          ACL: 'public-read',
        },
      })
      .done()
      .then(data => {
        const url = `${process.env.SPACES_ENPOINT}/${process.env.SPACES_BUCKET}/${docsKey}`;
        console.log("Uploaded docs URL:", url);
        return { type: 'docs', url };
      })
      .catch(err => {
        console.error("Error uploading docs:", err);
        throw err;
      });

      uploadPromises.push(docsUploadPromise);
    }

    // Wait for all uploads to finish
    const results = await Promise.all(uploadPromises);

    // Construct the response
    const response = {};
    results.forEach(result => {
      response[result.type] = result.url;
    });

    res.status(200).json(response);
  } catch (error) {
    console.error("Error uploading files:", error.message);
    res.status(500).json({ error: "Failed to upload files", details: error.message });
  }
};











// const sigupFiles=  async (req, res) => {


//     try {



//         const files = req.files;
//         const uploadPromises = [];

      
    
//         if (files.selfie) {
//           const selfieFile = files.selfie[0];
//           const selfieKey = `signup/${uuidv4()}-${selfieFile.originalname}`;
    
//           console.log("UPLOADING SELFIE", selfieKey)
//           uploadPromises.push(
//             new Upload({
//               client: s3Client,
//               params: {
//                 Bucket: process.env.SPACES_BUCKET, // Replace with your DigitalOcean Space name
//                 Key: selfieKey,
//                 Body: selfieFile.buffer,
//                 ACL: 'public-read',
//               },
//             }).done()
//             .then(data => {
//               // Manually construct the URL if the location is missing the bucket name
//               const url = `${process.env.SPACES_ENPOINT}/${process.env.SPACES_BUCKET}/${selfieKey}`;
//               console.log("Uploaded file URL:", url);
//             })
//             .catch(err => {
//               console.error("Error uploading file:", err);
//             })
//           );
//         }
//         if (files.profilePic) {
          
//           const profilePicFile = files.profilePic[0];
//           const profilePicKey = `signup/${uuidv4()}-${profilePicFile.originalname}`;
    
//           console.log("UPLOADING SELFIE", profilePicKey)
//           uploadPromises.push(
//             new Upload({
//               client: s3Client,
//               params: {
//                 Bucket: process.env.SPACES_BUCKET, // Replace with your DigitalOcean Space name
//                 Key: profilePicKey,
//                 Body: profilePicFile.buffer,
//                 ACL: 'public-read',
//               },
//             }).done()
//             .then(data => {
//               // Manually construct the URL if the location is missing the bucket name
//               const url = `${process.env.SPACES_ENPOINT}/${process.env.SPACES_BUCKET}/${profilePicKey}`;
//               console.log("Uploaded file URL:", url);
//             })
//             .catch(err => {
//               console.error("Error uploading file:", err);
//             })
//           );
//         }
    
//         if (files.docs) {
//           const docsFile = files.docs[0];
//           const docsKey = `signup/${uuidv4()}-${docsFile.originalname}`;
          
//           console.log("UPLOADING DOCS", docsKey)

//           uploadPromises.push(
//             new Upload({
//               client: s3Client,
//               params: {
//                 Bucket: process.env.SPACES_BUCKET, // Replace with your DigitalOcean Space name
//                 Key: docsKey,
//                 Body: docsFile.buffer,
//                 ACL: 'public-read',
//               },
//             }).done()
//             .then(data => {
//               // Manually construct the URL if the location is missing the bucket name
//               const url = `${process.env.SPACES_ENPOINT}/${process.env.SPACES_BUCKET}/${docsKey}`;
//               console.log("Uploaded file URL:", url);
//             })
//             .catch(err => {
//               console.error("Error uploading file:", err);
//             })
//           );
//         }
//     console.log("fILE ARE BEING UPLOADED", uploadPromises)
//         // Wait for all uploads to finish
//         const results = await Promise.all(uploadPromises);
//         console.log("THIS IS THE RESULT FORM THE UPLOAD", results)
//       res.status(200).json({ "selfie":results[0].Location,"profilePic":results[1].Location,"docs":results[2].Location });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }

    
//   };
  



  // Route to handle file upload
// const uploadFile   = async (req, res) => {

//   try {
    

//       console.log("UPLOADING SINGLE FILE")

//       const files = req.files;
//       const uploadPromises = [];
  

//       if (files.file) {
//         const file = files.file[0];
//         const fileKey = `${req.body.folder}/${uuidv4()}-${file.originalname}`;

//         uploadPromises.push(
//           new Upload({
//             client: s3Client,
//             params: {
//               Bucket: process.env.SPACES_BUCKET, // Replace with your DigitalOcean Space name
//               Key: fileKey,
//               Body: file.buffer,
//               ACL: 'public-read',
//             },
//           }).done()
//           .then(data => {
//             // Manually construct the URL if the location is missing the bucket name
//             const url = `${process.env.SPACES_ENPOINT}/${process.env.SPACES_BUCKET}/${fileKey}`;
//             console.log("Uploaded file URL:", url);
//           })
//           .catch(err => {
//             console.error("Error uploading file:", err);
//           })
//         );
//       }


//       await Promise.all(uploadPromises) .then(urls => {
//         console.log("All files uploaded successfully:");
//         urls.forEach(url => console.log(url)); // Print each file URL
//         res.status(200).json({ file: urls }); // You can also return this if used within a function
//       })
//       .catch(err => {
//         console.error("Failed to upload files:", err);
//         res.status(500).json({ error: "Failed to upload files", details: err.message });
//       });

//       // console.log("SERVER RESPONSE ",results[0])

//       // res.status(200).json({ "file":results[0].url });

//   } catch (error) {
//     console.log("ERROR UPLOADING FILE ",error.message)
//   }


//   };
  

const uploadFile = async (req, res) => {
  try {
    console.log("UPLOADING SINGLE FILE");

    const files = req.files;
    const uploadPromises = [];

    if (files.file) {
      const file = files.file[0];
      const fileKey = `${req.body.folder}/${uuidv4()}-${file.originalname}`;

      const uploadPromise = new Upload({
        client: s3Client,
        params: {
          Bucket: process.env.SPACES_BUCKET, // Replace with your DigitalOcean Space name
          Key: fileKey,
          Body: file.buffer,
          ACL: 'public-read',
        },
      })
      .done()
      .then(data => {
        // Manually construct the URL if the location is missing the bucket name
        const url = `${process.env.SPACES_ENPOINT}/${process.env.SPACES_BUCKET}/${fileKey}`;
        console.log("Uploaded file URL:", url);
        return url; // Return the constructed URL
      })
      .catch(err => {
        console.error("Error uploading file:", err);
        throw err; // Ensure the error propagates to Promise.all
      });

      uploadPromises.push(uploadPromise);
    }

    // Wait for all upload promises to complete
    const urls = await Promise.all(uploadPromises);

    console.log("All files uploaded successfully:");
    urls.forEach(url => console.log(url)); // Print each file URL

    // Return the URLs as a response to the client
    res.status(200).json({ file: urls[0] });

  } catch (error) {
    console.error("ERROR UPLOADING FILE:", error.message);
    res.status(500).json({ error: "Failed to upload files", details: error.message });
  }
};



module.exports = {uploadFile,sigupFiles,upload}
