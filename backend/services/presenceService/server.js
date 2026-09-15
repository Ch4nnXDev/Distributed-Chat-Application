const express = require("express");
const { startConsumer } = require("./kafka/consumer");
const { connectRedis } = require("./config/redisClient");
const { PRESENCE_EVENTS } = require("./kafka/topics");

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Hello Presence Service"
    });
});

app.listen(PORT, () => {
    console.log("Project is Running On", PORT);
});

const startPresenceService = async () => {
    try {
        await connectRedis();

        // Kafka consumer runs continuously
        await startConsumer(PRESENCE_EVENTS);

    } catch (error) {
        console.error(
            "Failed to start Presence Service:",
            error
        );

        process.exit(1);
    }
};

startPresenceService();