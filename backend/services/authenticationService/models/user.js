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
        required: false,    
    },
    googleId: {
        type: String,
    },

    photo: {
        type: String,
    },


});

const user = mongoose.model('User', userSchema);

module.exports = user;