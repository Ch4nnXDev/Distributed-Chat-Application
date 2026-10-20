const mongoose = require('mongoose');
const seedUser = require('./user.seeder');
const dotenv = require("dotenv");

dotenv.config();

const startSeed = async () => {
    try {

        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected Succefully");
        await seedUser();


    } catch (error) {
        console.log("Error:", error);

    }


}

startSeed();