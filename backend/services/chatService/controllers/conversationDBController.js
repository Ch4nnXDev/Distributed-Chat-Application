const conversation = require('../models/conversationModel');
const authServiceClient = require('../service/authServiceClient');

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

const getConversation = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const conversationData = await conversation.findById(conversationId).populate('participants');
        if (!conversationData) {
            return res.status(404).json({ error: "Conversation not found" });
        }
        res.status(200).json(conversationData);
    } catch (error) {
        console.log("Error fetching conversation", error);
        res.status(500).json({ error: "Failed to Fetch Conversation"});
    }
}


const updateConversation = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const { participants } = req.body;
        const updatedConversation = await conversation.findByIdAndUpdate(conversationId, { participants }, { new: true });
        if (!updatedConversation) {
            return res.status(404).json({ error: "Conversation not found" });
        }
        res.status(200).json(updatedConversation);
    } catch (error) {
        console.log("Error updating conversation", error);
        res.status(500).json({ error: "Failed to Update Conversation"});
    }
}

const deleteConversation = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const deletedConversation = await conversation.findByIdAndDelete(conversationId);
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
        const { conversationId, userId} = req.params;
        const conversationData = await conversation.findById(conversationId);
        if (!conversationData) {
            return res.status(404).json({ error: "Conversation not found" });
        }
        const userExist = await authServiceClient.userExists(userId);
        if (!userExist) {
            return res.status(404).json({ error: "User not found" });
        }
        const conversationHasUser = conversationData.participants.includes(userId);
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
        const conversationData = await conversation.findById(conversationId);
        if (!conversationData) {
            return res.status(404).json({ error: "Conversation not found" });
        }
        const userExist = await authServiceClient.userExists(userId);
        if (!userExist) {
            return res.status(404).json({ error: "User not found" });
        }
        const conversationHasUser = conversationData.participants.includes(userId);
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
    updateConversation,
    deleteConversation,
    addParticipant,
    removeParticipant
}