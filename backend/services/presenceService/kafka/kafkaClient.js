const {Kafka} = require("kafkajs");

const kafka = new Kafka({
    clientId: "presence-service",
    brokers: ["kafka: 9092"]
})
