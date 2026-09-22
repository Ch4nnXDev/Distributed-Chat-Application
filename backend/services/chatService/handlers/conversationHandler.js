const conversationHandler = (socket, io) => {

    socket.on("join_conversation", async (conversationId) => {
        try {

            socket.join(conversationId);

            console.log(
                `User ${socket.user.id} joined conversation ${conversationId}`
            );

        } catch (err) {
            console.error("Error joining the conversation", err);
        }
    });

};

module.exports = { conversationHandler };