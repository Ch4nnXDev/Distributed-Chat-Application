import { createClient } from 'redis';

const redisClient = createClient({url: "redis://localhost:6379"})


export const connectRedis = async () => {
    return await redisClient.connect();
}

export default redisClient;