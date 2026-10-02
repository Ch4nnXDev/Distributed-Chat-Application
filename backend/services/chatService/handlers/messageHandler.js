const { saveMessage } = require("../controllers/messageDBController")
const { sendMessage } = require("../kafka/producer");
const { CHAT_EVENTS } = require("../kafka/topics");
const Conversation = require("../models/conversationModel");

const messageHandler = (socket, io) => {

    socket.on("chat_message", async (msg) => {
        try {
            const { conversationId, text } = msg;

            const conversation = await Conversation.findOne({
                _id: conversationId,
                participants: socket.user.id
            });

            if (!conversation) {
                socket.emit("message_error", {
                    error: "You are not a participant of this conversation"
                });
                return;
            }

            const fullMessage = {
                conversationId,
                text,
                senderId: socket.user.id
            };

            const savedMessage = await saveMessage(fullMessage);

            io.to(conversationId).emit(
                "chat_message",
                savedMessage
            );

            await sendMessage(
                CHAT_EVENTS,
                savedMessage
            );

            console.log("Saved Message:", savedMessage);

        } catch (err) {
            console.error("Error sending message:", err);

            socket.emit("message_error", {
                error: "Failed to send message"
            });
        }
    });
};

module.exports = { messageHandler };