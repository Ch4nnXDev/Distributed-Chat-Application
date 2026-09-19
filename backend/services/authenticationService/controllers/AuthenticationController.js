const { signup } = require("../service/authService");
const jwt = require("jsonwebtoken");

const {
    saveUser,
    getUserByGoogleId,
    getAllUsers
} = require("../service/userDBService");

const { AppError } = require("../error/appError");



const signUpController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const token = await signup(email, password);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 15 * 60 * 1000
        });

        res.status(201).json({
            message: "User created"
        });

    } catch (error) {
        next(error);
    }
};



const logoutController = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax"
    });

    res.status(200).json({
        message: "Logged out"
    });
};



const saveUserController = async (req, res, next) => {
    try {
        const savedUser = await saveUser(req.body);

        res.status(201).json({
            message: "User saved",
            user: savedUser
        });

    } catch (error) {
        next(error);
    }
};



const getUserByGoogleIdController = async (req, res, next) => {
    try {
        const { googleId } = req.params;

        const user = await getUserByGoogleId(googleId);

        if (!user) {
            throw new AppError("User not found", 404);
        }

        res.status(200).json({
            user
        });

    } catch (error) {
        next(error);
    }
};



const getAllUsersController = async (req, res, next) => {
    try {
        const users = await getAllUsers();

        res.status(200).json({
            users
        });

    } catch (error) {
        next(error);
    }
};

const googleCallbackController = (req, res, next) => {
    try {
        const token = jwt.sign(
            {
                sub: req.user._id.toString()
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "15m",
                issuer: "auth-service",
                audience: "chat-service"
            }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 15 * 60 * 1000
        });

        res.redirect("http://localhost:5173/chats");

    } catch (error) {
        next(error);
    }
};


module.exports = {
    signUpController,
    logoutController,
    saveUserController,
    getUserByGoogleIdController,
    getAllUsersController,
    googleCallbackController
};