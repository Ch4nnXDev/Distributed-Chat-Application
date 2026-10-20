const mongoose = require("mongoose");
const seedConversations = require("../seeders/conversation.seed");
const seedMessages = require("../seeders/message.seed");
const dotenv = require("dotenv");

dotenv.config();

const startSeed = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("mongodb connected successfully");

    seedConversations();
    console.log("conversations seeded successfully")
    seedMessages();
    console.log("messages seeded successfully")

    

}

startSeed()