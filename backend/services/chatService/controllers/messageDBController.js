const Message = require('../models/messageModel');
const Conversation = require('../models/conversationModel');
const saveMessage = async (msg) => {
    try {
        const newMessage = new Message({
            conversationId: msg.conversationId,
            text: msg.text,
            senderId: msg.senderId
        });

        const saved = await newMessage.save();

        console.log("Saved message to DB:", saved);

        return saved;

    } catch (error) {
        console.error("Error saving message:", error);
        throw error;
    }
};

const getMessages = async (req, res) => {
    try {
        const { conversationId } = req.params;

        const conversationExists = await Conversation.findOne({
            _id: conversationId,
            participants: req.user.id
        });

        if (!conversationExists) {
            return res.status(404).json({
                error: "Conversation not found"
            });
        }

        const messages = await Message
            .find({ conversationId })
            .sort({ createdAt: 1 });

        return res.status(200).json(messages);

    } catch (error) {
        console.error("Error fetching messages:", error);

        res.status(500).json({
            error: "Failed to fetch messages"
        });
    }
};

module.exports = {
    getMessages,
    saveMessage
}