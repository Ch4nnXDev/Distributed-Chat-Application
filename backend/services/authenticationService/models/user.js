const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: false,
        unique: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,   
    },
    googleId: {
        type: String,
        required: false
    },
    googleAccessToken: {
        type: String,
    }


});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;