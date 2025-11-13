const { required } = require('@hapi/joi');
const mongoose = require('mongoose');
const { type } = require('node:os');

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    senderId: {
        type: String,
        required: false
    },
    senderEmail: {
        type: String,
        required: false
    }

}, { timestamps: true });

const message = mongoose.model('Message', messageSchema, 'messages');
module.exports = message;