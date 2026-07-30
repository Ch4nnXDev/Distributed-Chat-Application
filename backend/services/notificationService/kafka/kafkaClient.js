const { Kafka } = require("kafkajs");

const kafka = new Kafka({
    clientId: "notification-service",
    brokers: [
        "kafka:9092"

    ]
});

module.exports = kafka;