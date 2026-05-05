const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB for Notifications Service");
         
        } catch (error) {
            console.log("Error Connection to MongoDB", error);
    }
}

module.exports = connectDB;

  