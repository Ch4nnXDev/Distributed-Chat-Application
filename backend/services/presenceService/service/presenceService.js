const redis = require("../config/redisClient");

const createUser = async (user) => {
    await redis.sAdd("online-users", user);
    return console.log("User Created Inside Redis");

}

const getAllUser = async (id) => {

    const users = await redis.sMembers("online-users");
    return users;

}

const checkOnline = async (user) => {
    const isOnline = await redis.sIsMember("online-users", user);
    if (isOnline) {
        return true;
    } else {
        return false;
    }

}


module.exports = {
    createUser, getAllUser, checkOnline
}