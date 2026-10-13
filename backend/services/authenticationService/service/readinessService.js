const mongoose = require("mongoose");


const checkMongoDB = () => {
    return mongoose.connection.readyState === 1; // 1 = Connected

}

const checkReadiness = () => {
    const isMongoDBReady = checkMongoDB();

    return {
        ready: isMongoDBReady,
        dependencies: {
            mongodb: isMongoDBReady ? "ready" : "not ready"
        }
    };
};

module.exports = {
    checkReadiness
}