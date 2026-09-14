const conversationHandler = (socket, io) => {
    socket.on("join_conversation", async (conversationId) => {
        try {

        } catch (err) {
            console.error("Error joining the conversation", err);
        }
    })
}