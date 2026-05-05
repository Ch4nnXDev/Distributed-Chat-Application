import { redisClient } from "../config/redis";

export const setCache = async (key, value, ttl=60) => {
    await redisClient.set(key, JSON.stringify(value), {
        EX: ttl
    });
};


export const getCache = async (key) => {
    const data = await redisClient.get(key);
    if (data) {
        JSON.stringify(data);
    } else {
        console.log("NO data found");
        
    }
};


export const delCache = async (key) => {
    await redisClient.del(key);
    return console.log("Cache Deleted");
};

