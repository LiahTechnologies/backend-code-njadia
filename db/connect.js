const mongoose = require('mongoose')

const connectToMongoDb = async()=>{
    try {
       

            mongoose.connect('mongodb://172.17.0.2:27017/njangi', { useNewUrlParser: true, useUnifiedTopology: true });

            // Get the default connection
            const db = mongoose.connection;

            // Event handling for MongoDB connection
            db.on('error', console.error.bind(console, 'MongoDB connection error:'));
            db.once('open', function() {
            console.log('Connected to MongoDB successfully');
            });


    } catch (error) {
        console.log(`error connecting to mongodb  ${error.message}`)
    }
}


module.exports = connectToMongoDb