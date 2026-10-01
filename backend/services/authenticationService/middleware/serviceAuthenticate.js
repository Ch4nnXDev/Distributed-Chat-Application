const { AppError } = require("../error/appError");

const serviceAuthenticate = (req, res, next) => {
    const serviceKey = req.headers["x-service-key"];

    if (!serviceKey) {
        return next(new AppError("Service authentication required", 401));
    }

    if (serviceKey !== process.env.CHAT_SERVICE_KEY) {
        return next(new AppError("Invalid service credentials", 403));
    }

    req.service = "chat-service";

    next();
};

module.exports = serviceAuthenticate;