const kafka = require("./kafkaClient");
const producer = kafka.producer();

const connectProducer = async () => {
    try {

        await producer.connect();
        console.log("Kafka Connected");

    } catch (error) {
        console.log("Cannot Connect Kafka Producer");
    }
    

}


const sendKafkaMessage = async (topic, message) => {
    try {
        await producer.send({
            topic,
            messages: [{value: JSON.stringify(message)}]

        });

    } catch (error) {
        console.log("Error Sending Kafka Event", error);
    }
    

}


module.exports = {
    connectProducer,
    sendKafkaMessage
}