const { createClient} = require('redis');

const client = createClient({
    url: process.env.REDIS_URL
});

client.on('error', (err)=> {
    console.error("redis error", err);
});

const connectRedis = async () => {
    if (!client.isOpen) { //in the client object isOpen is a property not an object
        await client.connect();
        console.log('Redis Connected');
    }
};

module.exports = {
    connectRedis,
    redisClient: client
}
