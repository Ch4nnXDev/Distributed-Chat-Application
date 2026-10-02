const Conversation = require("../models/conversationModel.js");

const conversationHandler = (socket, io) => {

    socket.on("join_conversation", async (conversationId) => {
        try {

            const conversation = await Conversation.findById(
                { _id: conversationId, participants: socket.user.id }
            );
            if (!conversation) {
                console.error("Conversation not found:", conversationId);
                socket.emit("conversation_error", {
                    error: "Conversation not found"
                });
                return;
            }
            const isParticipant = conversation.participants.some(
                participantId =>
                    participantId.toString() === socket.user.id.toString()
            );

            if (!isParticipant) {
                console.error("User is not a participant of the conversation:", socket.user.id);
                socket.emit("conversation_error", {
                    error: "User is not a participant of the conversation"
                });
                return;
            }

            socket.join(conversationId);

            console.log(
                `User ${socket.user.id} joined conversation ${conversationId}`
            );

        } catch (err) {
            console.error("Error joining the conversation", err);
            socket.emit("conversation_error", {

                error: "Failed to join conversation"
            });
        }
    });

};

module.exports = { conversationHandler };