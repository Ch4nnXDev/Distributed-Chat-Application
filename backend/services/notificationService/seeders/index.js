const seedNotifications = require("../seeders/notification.seed");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const startSeed = async () => {

    await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log("mongodb connected successfully");
    seedNotifications();
    console.log("notifications seeded successfully");

    
}

startSeed();