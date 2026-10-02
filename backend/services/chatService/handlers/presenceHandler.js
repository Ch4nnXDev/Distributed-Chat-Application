const { PRESENCE_EVENTS } = require("../kafka/topics");
const { sendMessage } = require("../kafka/producer");

const presenceHandler = async (data) => {
    const { userId, status } = data;

    if (status !== "online" && status !== "offline") {
        return;
    }

    await sendMessage(PRESENCE_EVENTS, {
        userId,
        status
    });
};

module.exports = presenceHandler;