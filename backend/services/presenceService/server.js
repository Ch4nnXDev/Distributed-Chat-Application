const express = require("express");
const {startConsumer} = require("./kafka/consumer")
const  {PRESENCE_EVENTS} = require("./kafka/topics")
const app = express();

const PORT = 3000;

startConsumer(PRESENCE_EVENTS);


app.get("/", (req, res) => {
    res.status(200).json({
        message: "Hello Presence Service"
    });
});

app.listen(PORT, () => {
    console.log("Project is Running On", PORT);
});

