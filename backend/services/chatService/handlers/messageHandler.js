const { saveMessage } = require("../controllers/messageDBController")
const { sendMessage } = require("../kafka/producer");
const { CHAT_EVENTS } = require("../kafka/topics");

const messageHandler = (socket, io) => {


    socket.on("chat_message", async (msg) => {
        try {
            const fullMessage = {
                text: msg.text,
                senderId: socket.user.id,
                senderEmail: socket.user.email,
            };

            const savedMessage = await saveMessage(fullMessage);

            io.emit("chat_message", savedMessage);

            console.log("Saved Message:", savedMessage);

            await sendMessage(CHAT_EVENTS, savedMessage);

            console.log("Received msg from client:", msg);

        } catch (err) {
            console.error("Error Sending Message:", err);
        }
    });
};

module.exports = { messageHandler };