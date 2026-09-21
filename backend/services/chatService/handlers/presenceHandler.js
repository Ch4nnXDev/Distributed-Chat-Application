const {PRESENCE_EVENT} = require("../kafka/topics");
const producer = require("../kafka/producer");


const presenceHandler = async (data) => {

    const {userId, status} = data;

    if (status === "online") {

        return await producer.send(
            {
                topic: PRESENCE_EVENT,
                messages: [
                    {
                        value: JSON.stringify({
                            userId,
                            status: "online"
                        })
                    }
                ]
            }
        )

    }

    if (status === "offline") {
        return await producer.send({
            topic: PRESENCE_EVENT,
            messages: [
                {
                    value: JSON.stringify({
                        userId,
                        status: "offline"
                    })
                }
            ]
        })
    }


}



module.exports = presenceHandler;