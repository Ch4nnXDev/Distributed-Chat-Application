const mongoose = require('mongoose');
const {required} = require('@hapi/joi');


const conversationModel = new mongoose.Schema({
    participants: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true
    },




}, { timestamps: true});

const Conversation = mongoose.model('Conversation', conversationModel, 'conversations');
module.exports = Conversation;