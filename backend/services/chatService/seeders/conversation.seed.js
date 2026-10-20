
const Conversation = require("../models/conversationModel");

const seedConversations = async () => {

    const fetchedUsers = await fetch(`${process.env.AUTH_SERVICE_URL}/auth/internal/users`); //this is a response Object

    if (!fetchedUsers.ok) {
        throw new Error("no users found in the database");
    }
    const data = await fetchedUsers.json();
    const userIds = data.users.map(user => user._id);

    const participants = [userIds[0], userIds[1]];
    const conversation = await Conversation.findOne(
        {participants: participants}
    )
    if (!conversation) {
        await Conversation.create({
        participants: participants,
        createdBy: userIds[0]
    })

    }


}

module.exports = seedConversations
