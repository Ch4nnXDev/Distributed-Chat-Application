const { messageHandler } = require("./messageHandler")
const { presenceHandler } = require("./connectionHandler");



const connectionHandler = async (socket, io) => {

    console.log('User connected:', socket.user.id, 'as', socket.user?.email);

    const userId = socket.user.id;

    await presenceHandler({
        userId: userId,
        status: "online"
    });


    
    messageHandler(socket, io);

    socket.on('disconnect', async () => {
        console.log('User disconnected:', socket.id);


        await presenceHandler({
            userId: userId,
            status: "offline"
        })
    });

}

module.exports = { connectionHandler };