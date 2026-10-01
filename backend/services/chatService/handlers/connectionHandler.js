const { messageHandler } = require("./messageHandler");
const presenceHandler  = require("./presenceHandler");
const { conversationHandler } = require("./conversationHandler")



const connectionHandler = async (socket, io) => {

    console.log('User connected:', socket.user.id);

    const userId = socket.user.id;

    await presenceHandler({
        userId: userId,
        status: "online"
    });


    
    messageHandler(socket, io);
    conversationHandler(socket, io);

    socket.on('disconnect', async () => {
        console.log('User disconnected:', socket.id);


        await presenceHandler({
            userId: userId,
            status: "offline"
        })
    });

}

module.exports = { connectionHandler };