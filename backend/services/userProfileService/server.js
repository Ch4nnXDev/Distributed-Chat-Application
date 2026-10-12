const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors);

app.get("/", (req, res) => {
    res.status(200).json({message: "ok"});

})
PORT = 6000

const server = () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server is Runing On ${PORT}`);
        })

    } catch (error) {
        console.log("error starting the server", error);
        process.exit(1);
    }

}

server();