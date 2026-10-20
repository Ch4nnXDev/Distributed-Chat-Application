
const Message = require("../models/messageModel");
const Conversation = require("../models/conversationModel");

const seedMessages = async () => {
    const responseObj = await fetch(
        `${process.env.AUTH_SERVICE_URL}/auth/internal/users`
    );

    if (!responseObj.ok) {
        throw new Error(`Failed to fetch users: ${responseObj.status}`);
    }

    const data = await responseObj.json();
    const userIds = data.users.map(user => user._id);

    if (userIds.length === 0) {
        throw new Error("No users found");
    }

    const conversation = await Conversation.findOne({});

    if (!conversation) {
        throw new Error("No conversation found. Seed conversations first.");
    }

    const senderId = userIds[0];

    await Message.create({
        conversationId: conversation._id,
        text: "Seed Test Message",
        senderId
    });

    console.log("Message seeded successfully");
};

module.exports = seedMessages;
