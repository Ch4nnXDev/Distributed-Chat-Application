const { Kafka } = require('kafkajs');
const kafka = new Kafka({
    clientId: 'chat-service',
    brokers: ['kafka:9092']
})

module.exports = kafka;