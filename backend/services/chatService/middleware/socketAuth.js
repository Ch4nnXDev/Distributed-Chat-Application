const jwt = require("jsonwebtoken");
const cookie = require("cookie");

const SocketAuth = (socket, next) => {
    try {
        const parsedCookie = cookie.parse(
            socket.handshake.headers.cookie ?? ""
        );

        const token = parsedCookie.token;

        if (!token) {
            return next(new Error("Token Missing"));
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET,
            {
                issuer: "auth-service",
                audience: "chat-service"
            }
        );

        console.log("Decoded Token:", decoded);

        socket.user = {
            id: decoded.sub
        };

        next();

    } catch (err) {
        console.error("Socket authentication failed:", err);
        next(new Error("Invalid token"));
    }
};

module.exports = {
    SocketAuth
};