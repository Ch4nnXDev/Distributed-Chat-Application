const { checkReadiness } = require("../service/readinessService");

const readinessController = (req, res) => {
    const readinessStatus = checkReadiness();

    if (!readinessStatus.ready) {
        return res.status(503).json({
            status: "not ready",
            dependencies: readinessStatus.dependencies
        });
    }

    return res.status(200).json({
        status: "ready",
        dependencies: readinessStatus.dependencies
    });
}

module.exports = {
    readinessController
}