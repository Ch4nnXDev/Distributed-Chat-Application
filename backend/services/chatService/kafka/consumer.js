const kafka = require('./kafkaClient');
const consumer = kafka.consumer({ groupId: 'chat-group' });

const startConsumer = async (topic, handleMessage) => {
    try {
        await consumer.connect();
        await consumer.subscribe({topic, fromBeginning: false});
        await consumer.run({
            eachMessage: async ({ message }) => {
                const parsedMessage = JSON.parse(message.value.toString());
                console.log(`Received message on topic ${topic}:`, parsedMessage);
                await handleMessage(parsedMessage);
            }
        })

    } catch (error) {
        console.error("Error starting Kafka consumer:", error);
    }
}

module.exports = startConsumer;