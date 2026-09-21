const { redisClient: redis } = require("../config/redisClient");

const createUser = async (userId) => {
    await redis.sAdd("online-users", userId);
    console.log("User Created Inside Redis");
}


const getAllUsers = async () => {

    const users = await redis.sMembers("online-users");
    return users;
}


const checkOnline = async (userId) => {
    return await redis.sIsMember("online-users", userId);

}


const userOffline = async (userId) => {
    return await redis.sRem("online-users", userId);
}



const getOnlineCount = async () => {
    return await redis.sCard("online-users");

}



module.exports = {
    createUser, getAllUsers, checkOnline, userOffline, getOnlineCount
}