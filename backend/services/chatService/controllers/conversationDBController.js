const conversation = require('../models/conversationModel');
const authServiceClient = require('../service/authServiceClient');

const createConversation = async (req, res) => {
    try {

        const newConversation = new conversation({
            participants: [req.user.id],
            createdBy: req.user.id
        });

        await newConversation.save();

        res.status(201).json(newConversation);

    } catch (error) {
        console.log("Error creating conversation", error);
        res.status(500).json({
            error: "Failed to create conversation"
        });
    }
};

const getConversations = async (req, res) => {
    try {
        const conversations = await conversation.find({
            participants: req.user.id
        });

        res.status(200).json(conversations);

    } catch (error) {
        console.log("Error fetching conversations", error);
        res.status(500).json({
            error: "Failed to fetch conversations"
        });
    }
};

const getConversation = async (req, res) => {
    try {
        const { conversationId } = req.params;

        const conversationData = await conversation.findOne({
            _id: conversationId,
            participants: req.user.id
        });

        if (!conversationData) {
            return res.status(404).json({
                error: "Conversation not found"
            });
        }

        res.status(200).json(conversationData);

    } catch (error) {
        console.log("Error fetching conversation", error);
        res.status(500).json({
            error: "Failed to fetch conversation"
        });
    }
};

const deleteConversation = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const deletedConversation = await conversation.findOneAndDelete({
            _id: conversationId,
            createdBy: req.user.id
        });
        if (!deletedConversation) {
            return res.status(404).json({ error: "Conversation not found" });
        }
        res.status(200).json({ message: "Conversation deleted" });
    } catch (error) {
        console.log("Error deleting conversation", error);
        res.status(500).json({ error: "Failed to Delete Conversation"});
    }
}       

const addParticipant = async (req, res) => {
    try {
        const { conversationId, userId } = req.params;
        const conversationData = await conversation.findOne({
            _id: conversationId,
            createdBy: req.user.id
        });
        if (!conversationData) {
            return res.status(404).json({ error: "Conversation not found" });
        }
        const userExist = await authServiceClient.userExists(userId);
        if (!userExist) {
            return res.status(404).json({ error: "User not found" });
        }
        const conversationHasUser = conversationData.participants.some(
            participantId => participantId.toString() === userId
        );
        if (conversationHasUser) {
            return res.status(400).json({ error: "User already in conversation" });
        }
        conversationData.participants.push(userId);
        await conversationData.save();
        res.status(200).json({ message: "Participant added to conversation" }); 
    } catch (error) {
        console.log("Error adding participant to conversation", error);
        res.status(500).json({ error: "Failed to add participant to conversation" });
    }
}

const removeParticipant = async (req, res) => {
    try {
        const { conversationId, userId } = req.params;
        const conversationData = await conversation.findOne({
            _id: conversationId,
            createdBy: req.user.id
        });
        if (!conversationData) {
            return res.status(404).json({ error: "Conversation not found" });
        }
        const userExist = await authServiceClient.userExists(userId);
        if (!userExist) {
            return res.status(404).json({ error: "User not found" });
        }
        const conversationHasUser = conversationData.participants.some(
            participantId => participantId.toString() === userId
        );
        if (!conversationHasUser) {
            return res.status(400).json({ error: "User not in conversation" });
        }
        conversationData.participants.pull(userId);
        await conversationData.save();
        res.status(200).json({ message: "Participant removed from conversation" }); 
    } catch (error) {
        console.log("Error removing participant from conversation", error);
        res.status(500).json({ error: "Failed to remove participant from conversation" });
    }
}
module.exports = {
    getConversations,
    createConversation,
    getConversation,
    deleteConversation,
    addParticipant,
    removeParticipant
}