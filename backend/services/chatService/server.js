const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./db/db.js'); // your DB connection module
const messageRoutes = require('./routes/messageRoutes'); // your REST API routes
const { saveMessage } = require('./controllers/messageController');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Middleware
app.use(cors({
  origin: FRONTEND_URL,
  methods: ["GET", "POST"],
  credentials: true 
}));
app.use(bodyParser.json());

// Connect to Database
connectDB();

// Routes
app.use('/api', messageRoutes);

// HTTP Server + Socket.io setup
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL || '*', // restrict in production
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('chat_message', async (msg) => {
    console.log("Received msg from client:", msg);
    // Optionally save message to DB
    const fullMessage = await saveMessage(msg.text, socket.id);

    // Broadcast to all clients except sender
    io.emit('chat_message', fullMessage);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});


// Start server
server.listen(PORT, () => {
  console.log(`Chat service running on port ${PORT}`);
});
