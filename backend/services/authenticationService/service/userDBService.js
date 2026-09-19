const User = require("../models/user");


const saveUser = async (userData) => {
    return await User.create(userData);
};


const getUserByGoogleId = async (googleId) => {
    return await User.findOne({ googleId });
};


const getUserById = async (userId) => {
    return await User.findById(userId);
};


const getAllUsers = async () => {
    return await User.find({});
};

module.exports = {
    saveUser,
    getUserByGoogleId,
    getUserById,
    getAllUsers
};