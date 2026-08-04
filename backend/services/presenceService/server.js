const express = require('express');
const router = express.Router();
const {connectProducer, sendKafkaMessage} = require("./kafka/producer");
const {startConsumer} = require("./kafka/consumer");

router.get("/connect", async (req, res) => {
    await connectProducer();
    await startConsumer();
    res.send("Kafka Connected");
})

router.post("/send", async (req, res) => {
    const {topic, message} = req.body;
    await sendKafkaMessage(topic, message);
    res.send("Message Sent");
})

module.exports = router;