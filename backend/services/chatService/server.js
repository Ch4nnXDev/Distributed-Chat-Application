const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const connectDB = require('./db/db.js'); 
const messageRoutes = require('./routes/messageRoutes'); 
const { saveMessage } = require('./controllers/messageController');
const { topic, CHAT_MESSAGES } = require('./kafka/topics');
const { sendMessage, connectProducer } = require('./kafka/producer.js');
const cookie = require('cookie');


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



const server = http.createServer(app);
const io = socketIo(server, {
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

io.use((socket, next) => {
  const parsedCookie = cookie.parse(socket.handshake.headers.cookie || '');
  const token = parsedCookie.token;
  console.log("ok", token)
  if (!token) return next(new Error("No token"));
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);
    socket.user = decoded; 
    next();
  } catch (err) {
    next(new Error("Invalid token"));
  }
});


io.on('connection', (socket) => {
  console.log('User connected:', socket.id, 'as', socket.user?.email);

  socket.on('chat_message', async (msg) => {


    try {
      const fullMessage = {
      text: msg.text,
      senderId: socket.user.id,
      senderEmail: socket.user.email,
      };

      const savedMessage = await saveMessage(fullMessage);
      io.emit('chat_message', savedMessage);

      
      console.log("Saved Message:", savedMessage);
      await sendMessage(CHAT_MESSAGES, savedMessage);
      console.log("Received msg from client:", msg);
      
    } catch (err) {
      console.log("Error Sending Message", err);
    }
    
 
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});



// Start server
server.listen(PORT, () => {
  console.log(`Chat service running on port ${PORT}`);
});
