const Joi = require('@hapi/joi');
const mongoose = require('mongoose');


const messageSchema = new mongoose.Schema({

    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation",
        required: true,
        index: true
    },

    text: {
        type: String,
        required: true
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    },


}, { timestamps: true });

const message = mongoose.model('Message', messageSchema, 'messages');
module.exports = message;