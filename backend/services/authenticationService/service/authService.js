const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const { AppError } = require("../error/appError");



const signup = async(email, password) => {


    const existingUser = await User.findOne({email});

    if (existingUser) {
        throw new AppError("User already exists", 409);
    }
    
    const hashedPassword = await bcrypt.hash(password, 20);
    const user = await User.create({
        email: email,
        password: hashedPassword
    })
    const token = jwt.sign({sub: user._id.toString()}, process.env.JWT_SECRET, {
        expiresIn: "15m",
        iss: "auth-service",
        aud: "chat-service"
    })

    return token;


}

module.exports = {
    signup
}
