const kafka = require("./kafkaClient");
const producer = kafka.producer();

export const connectProducer = async () => {
    try {

        await producer.connect();
        console.log("Kafka Connected");

    } catch (error) {
        console.log("Cannot Connect Kafka Producer");
    }
    

}


export const sendKafkaMessage = async (topic, message) => {
    try {
        await producer.send({
            topic,
            messages: [{value: JSON.stringify(message)}]

        });

    } catch (error) {
        console.log("Error Sending Kafka Event", error);
    }
    

}