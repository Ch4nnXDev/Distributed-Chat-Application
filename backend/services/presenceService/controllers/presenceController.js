const {
    userOffline,
    getAllUsers,
    checkOnline
} = require("../service/presenceService");

const createUserController = async (req, res) => {
    const {user} = req.user;
    return await createUser(user);
    
}

const getAllUsersController = async (req, res) => {
    const users = await getAllUsers();
    return users;
    

}

const isOnlineController = async (req, res) => {
    const {user} = req.user;
    return await checkOnline(user)

}

const userOffline = async (req, res) => {
    return await redisC
}


module.export = {
    createUserController,
    getAllUsersController,
    isOnlineController,
    userOffline
}