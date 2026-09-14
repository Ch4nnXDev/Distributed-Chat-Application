const SocketAuth = (socket, next) => {
    try {

        const parsedCookie = cookieParse(socket.handshake.headers.cookie ?? "");

        const token = parsedCookie.token;

        if (!token) return next(new Error("Token Missing"))

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        console.log("Decoded Token:", decoded);
        socket.user = {
            id: decoded.id, 
            email: decoded.email
        }; 

        next();

    } catch (err) {
        next(new Error("Invalid token"));
    }
   
}

module.exports = {
    SocketAuth
}