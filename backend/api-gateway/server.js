const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const cookie = require('cookie');

dotenv.config();
const app = express();
const server = http.createServer(app);

app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true,
}));

app.get('/', (req, res) => res.send('API Gateway running ✅'));

// ---- AUTH SERVICE ----
app.use('/auth', createProxyMiddleware({
  target: 'http://authenticationservice:4000',
  pathRewrite: { '^/auth': '' },
  changeOrigin: true,
  onProxyReq: (proxyReq, req) => {
    if (req.cookies?.token) {
      proxyReq.setHeader('Authorization', `Bearer ${req.cookies.token}`);
    }
  },
}));

// ---- CHAT SERVICE ----
const chatProxy = createProxyMiddleware({
  target: 'http://chatservice:4001',
  changeOrigin: true,
  ws: true,
  pathRewrite: { '^/chat': '' },
  onProxyReq: (proxyReq, req) => {
    if (req.cookies?.token) {
      proxyReq.setHeader('Authorization', `Bearer ${req.cookies.token}`);
    }
  },
});

// ---- WEBSOCKET HANDSHAKE ----
server.on('upgrade', (req, socket, head) => {
  if (req.url.startsWith('/chat')) {
    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.token;
    console.log('🍪 WS Cookies:', cookies);
    console.log('🎫 Token:', token);

    if (token) {
      // Inject token into headers for socket.io auth
      req.headers.authorization = `Bearer ${token}`;
      console.log('✅ Attached Authorization header for WS upgrade');
    } else {
      console.warn('⚠️ No token cookie found in WS upgrade');
    }

    // Must forward after adding header
    chatProxy.upgrade(req, socket, head);
  }
});

app.use('/chat', chatProxy);

server.listen(8080, () => {
  console.log('🚀 API Gateway running on http://localhost:8080');
});
