const kafka = require('./kafkaClient');
const producer = kafka.producer();

const connectProducer = async () => {
  try {
    await producer.connect();
    console.log('Kafka Producer connected');
  } catch (error) {
    console.error('Error connecting producer:', error);
  }
};

const sendMessage = async (topic, message) => {
  try {
    await producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

module.exports = { connectProducer, sendMessage, producer };
