const kafka = require("./kafkaClient");
const consumer = kafka.consumer();


const startConsumer = async () => {

    try {
        await consumer.connect();
        console.log("Consumer Started")

    } catch (error) {
        console.log("Error Starting The Consumer", error)
    }
    

}