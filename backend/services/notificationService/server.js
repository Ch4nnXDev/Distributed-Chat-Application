const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const {connectRedis} = require("./config/redis");
const notificationsRoutes = require('./routes/notificationsRoutes');
dotenv.config();

const app = express();
connectRedis();
app.use(express.json()); //usually nodejs read request data as just raw data by doing turns dats into json format.
app.use(cors());
connectDB();
app.use('/api/notifications', notificationsRoutes);
const PORT = process.env.PORT;


app.listen(PORT, () => {
    console.log('Notifications Server has Started on PORT');
});

