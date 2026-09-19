const jwt = require("jasonwebtoken")

const authenticate = async (req, res, next) => {
    try {

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return next(new Error("Authetication is Missing"))
        }

        const token = authHeader.split("")[1];
        const decode = jwt.verify(
            token,
            process.env.JWT_SECRET,
            {
                issuer: "auth-service",
                audience: "chat-service"
            }
        )

        req.user = decode;
        next();

        



    } catch (error) {
        next(error)
    }
 
    
}