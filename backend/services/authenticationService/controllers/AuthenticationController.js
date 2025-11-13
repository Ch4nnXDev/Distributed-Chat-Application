const { throws } = require('assert');
const user = require('../models/user');

const saveMessage = async (username, password, googleId) => {
    try {
        const newUser = new user({ username, password, googleId });
        const savedUser = await newUser.save();
        console.log("Saved user to DB:", savedUser);
        return savedUser;
    } catch (error) {
        console.error("Error saving user:", error);
        throw error; // Re-throw the error for further handling
    }

}


const getUser = async(googleId) => {
    try {
        const foundUser = await getUserbyGoogleId(googleId);
        if (!foundUser) {
            throw new Error("User not found");
        }
        return foundUser;
    } catch (error) {
        throws(error);  
    }
}

module.exports = {
    saveMessage,
    getUser
};