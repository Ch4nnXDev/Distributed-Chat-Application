const kafka = require("./kafkaClient");
const {
createUser, userOffline
} = require("../service/presenceService");

const consumer = kafka.consumer({
    groupId: "presence-group"
});


const startConsumer = async (topic) => {

    try {
        await consumer.connect();
        console.log("Consumer Started");

        await consumer.subscribe({
            topic: topic,
            fromBeginning: false

        });

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {

                const data = JSON.parse(
                    message.value.toString()
                );
                switch (data.type) {
                    case "USER_ONLINE":
                        await createUser(data.userId);
                        break;
                    case "USER_OFFLINE":
                        await userOffline(data.userId);
                        break;

                    default:
                        console.log("Unknown event type:", data.type);
                }

                console.log("Received event:", data);
            }
        });

    } catch (error) {
        console.log("Error Starting The Consumer", error)
    }
    

}

module.exports = {
    startConsumer
}