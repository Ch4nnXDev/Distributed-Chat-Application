const express = require('express');
const http = require('http');                                               
const socketIo = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js'); 
const messageRoutes = require('./routes/messageRoutes'); 
const { connectProducer } = require('./kafka/producer.js');
const { SocketAuth } = require("./middleware/socketAuth.js");
const { connectionHandler } = require("./handlers/connectionHandler");
const conversationRoutes = require('./routes/conversationRoutes.js');
const cookieParser = require("cookie-parser");
const authenticate = require('./middleware/authenticate.js');


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
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true
}));

app.use(bodyParser.json());
app.use(cookieParser());

// Connect to Database
connectDB();
connectProducer();



// Routes
app.use('/api', authenticate, messageRoutes);
app.use('/api/conversations', authenticate, conversationRoutes);

app.get('/auth/me', authenticate, (req, res) => {
  res.json({
    id: req.user.id
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
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
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
