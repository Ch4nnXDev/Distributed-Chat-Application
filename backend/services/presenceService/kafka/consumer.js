const kafka = require("./kafkaClient");
const {
    createUserController,
    getAllUsersController,
    isOnlineController,
    userOffline
} = require("../controllers/presenceController");

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
                        await createUserController(data.userId)
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