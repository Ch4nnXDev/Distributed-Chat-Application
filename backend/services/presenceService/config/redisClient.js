const { createClient } = require("redis");

const redisClient = createClient({
    url: "redis://localhost:6379"
});

const connectRedis = async () => {
    await redisClient.connect();
    console.log("Redis Connected");
};

module.exports = {
    redisClient,
    connectRedis
};