const message = require('../models/messageModel');



const saveMessage = async (text, sender) => {
    try {
        const newMessage = new message({text , sender});
        const saved = await newMessage.save();
        console.log("Saved message to DB:", saved);
        return saved;

    } catch (error) {
        console.error("Error saving message:", error);
        
    }
}

const getMessages = async (req, res) => {
    try {
        const messages = await message.find().sort({ createdAt: 1 });
        return res.status(200).json(messages);
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ error: "Failed to fetch messages" });
      }
}

module.exports = {
    getMessages,
    handleMessages,
    saveMessage
};