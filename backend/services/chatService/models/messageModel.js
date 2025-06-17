const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: false
    }

}, { timestamps: true });

const message = mongoose.model('Message', messageSchema);
module.exports = message;