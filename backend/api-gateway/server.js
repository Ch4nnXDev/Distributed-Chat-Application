const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cookieParser());

app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
        credentials: true,
    })
);

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        service: "api-gateway",
    });
});

app.use(
    "/auth",
    createProxyMiddleware({
        target: "http://authenticationservice:4000",
        changeOrigin: true,
        pathRewrite: {
            "^/auth": "",
        },
        on: {
            proxyReq: (proxyReq, req) => {
                const token = req.cookies?.token;

                if (token) {
                    proxyReq.setHeader(
                        "Authorization",
                        `Bearer ${token}`
                    );
                }
            },
        },
    })
);

const chatProxy = createProxyMiddleware({
    target: "http://chatservice:4001",
    changeOrigin: true,
    ws: true,
    pathRewrite: {
        "^/chat": "",
    },
    on: {
        proxyReq: (proxyReq, req) => {
            const token = req.cookies?.token;

            if (token) {
                proxyReq.setHeader(
                    "Authorization",
                    `Bearer ${token}`
                );
            }
        },
        error: (err) => {
            console.error(
                "[Gateway] Chat proxy error:",
                err.message
            );
        },
    },
});

app.use("/chat", chatProxy);

server.on("upgrade", (req, socket, head) => {
    if (!req.url.startsWith("/chat")) {
        socket.destroy();
        return;
    }

    chatProxy.upgrade(req, socket, head);
});

server.listen(8080, () => {
    console.log("API Gateway running on port 8080");
});