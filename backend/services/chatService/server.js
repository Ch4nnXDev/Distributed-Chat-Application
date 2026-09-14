const express = require('express');
const http = require('http');                                                //The Connection happens first and then the token verification happens on the retry so there is a problem in my setup.
const socketIo = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js'); 
const messageRoutes = require('./routes/messageRoutes'); 
const { saveMessage } = require('./controllers/messageDBController');
const { sendMessage, connectProducer } = require('./kafka/producer.js');
const { SocketAuth } = require("./middleware/socketAuth.js")
const { connectionHandler } = require("./handlers/connectionHandler")


dotenv.config();

const app = express();
const PORT = process.env.PORT || 4001;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';  

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',      // Frontend
    'http://localhost:8080'       // API Gateway
  ],
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(bodyParser.json());

// Connect to Database
connectDB();
connectProducer();
// Routes
app.use('/api', messageRoutes);

app.get('/auth/me', (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "No token provided"});
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  res.json({
    id: decoded.id,
    email: decoded.email
  });
  

});

const server = http.createServer(app);
const io = socketIo(server, { //this is the socket server
  path: "/socket.io",
  cors: {
    origin: [
      'http://localhost:5173',
      'http://localhost:8080'
    ],
    methods: ['GET', 'POST'],
    credentials: true
  }
});

io.use(SocketAuth);


io.on('connection', (socket) => {
  
  connectionHandler(socket, io);
});



// Start server
server.listen(PORT, () => {
  console.log(`Chat service running on port ${PORT}`);
});
