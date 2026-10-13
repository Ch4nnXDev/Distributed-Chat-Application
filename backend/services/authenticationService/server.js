const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const {readinessController} = require("./controllers/readinessController");
const connectDB = require("./config/db");
const Configpassport = require("./config/passport");

const authRoutes = require("./routes/authRoutes");
const internalUserRoutes = require("./routes/internalUserRoutes");

const { errorHandler } = require("./error/errorHandler");

dotenv.config();

const app = express();


app.use(express.json());
app.use(cookieParser());


app.use(passport.initialize());
Configpassport();


app.use("/", authRoutes);
app.use("/internal", internalUserRoutes);

app.use("/ready", readinessController);

app.use(errorHandler);

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        service: "api-gateway",
        uptime: process.uptime()
    });
});


const startServer = async () => {
    try {
        await connectDB();

        app.listen(4000, () => {
            console.log(
                "Auth Service running on http://localhost:4000"
            );
        });

    } catch (error) {
        console.error(
            "Failed to start Authentication Service:",
            error
        );

        process.exit(1);
    }
};

startServer();