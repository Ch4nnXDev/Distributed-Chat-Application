const { messageHandler } = require("./messageHandler")
const { sendMessage } = require("./../kafka/producer");
const { PRESENCE_EVENTS } = require("../kafka/topics");
const { presenceHandler } = require("./connectionHandler");

const connectionHandler = async (socket, io) => {

    console.log('User connected:', socket.user.id, 'as', socket.user?.email);
    
    await sendMessage(PRESENCE_EVENTS, {
        type: "USER_ONLINE",
        userId: socket.user.id,
        emailId: socket.user.email
    });


    
    messageHandler(socket, io);

    socket.on('disconnect', async () => {
        console.log('User disconnected:', socket.id);


        await sendMessage(PRESENCE_EVENTS, {
            type: "USER_OFFLINE",
            userId: socket.user.id,
            emailId: socket.user.email
        })
    });

}

module.exports = { connectionHandler };