const { CHAT_MESSAGES } = require('../../chatService/kafka/topics');
const kafka = require('./kafkaClient')
const consumer = kafka.consumer({groupId: "notification-group"})


const startConsumer = async (topic, handleNotification) => {
    try {
        await consumer.connect();
        await consumer.subscribe(
            {
                topic: topic,
                fromBeginning: false
            }
        );

        await consumer.run({
            eachMessage: async ({message}) => {
                const event = JSON.parse(
                    message.value.toString()
                );
                console.log("Notification Received:", event);
                await handleNotification(event);
            }
        })
    } catch (error) {

        console.error("Kafka Consumer Error:", error);

    }
}