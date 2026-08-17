const conversation = require('../models/conversationModel');

const createConversation = async (req, res) => {
    try {
        const { participants } = req.body;
        const newConversation = new conversation({
            participants: participants
        })
        await newConversation.save();
        res.status(201).json({ message: "Conversation created" });
        

    } catch (error) {
        console.log("Error creating conversation", error);
        res.status(500).json({ error: "Failed to create conversation" });
    }
}

const getConversations = async (req, res) => {
    try {
        const conversations = await conversation.find().populate('participants');
        res.status(200).json(conversations);
    } catch (error) {
        console.log("Error fetching conversations", error);
        res.status(500).json({ error: "Failed to Fetch Conversations"});
    }
}

module.exports = {
    getConversations,
    createConversation
}