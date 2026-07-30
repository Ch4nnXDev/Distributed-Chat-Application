
const mongoose = require('mongoose');


const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: true
    },

    displayName: String,
    bio: String,
    avatar: {
        url: String,
        publicId: String
    },


    
}, {timestamps: true});