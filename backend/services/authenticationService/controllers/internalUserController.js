const { getUserById, getAllUsers } = require("../service/userDBService");
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
        next(error);
    }
}

const getInternalAllUsers = async (req, res, next) => {
    try {
        const users = await getAllUsers();
        if (users == null) {
            return next( new AppError("no users found in the database", 404));
        }

        res.status(200).json({
            users: users
        });

    } catch (error) {
        next(error);

    }
}




module.exports = {
    getInternalUserById,
    getInternalAllUsers
}

