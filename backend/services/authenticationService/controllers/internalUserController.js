const { getUserById } = require("../service/userDBService");
const { AppError } = require("../error/AppError");

const getInternalUserById = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const user = await getUserById(userId);
        if (!user) {
            return next(new AppError("User not found", 404));
        }
        res.status(200).json({
            id: user._id.toString()
        });
    } catch (error) {
        next(new AppError("Failed to fetch user", 500));
    }
}


module.exports = {
    getInternalUserById
}