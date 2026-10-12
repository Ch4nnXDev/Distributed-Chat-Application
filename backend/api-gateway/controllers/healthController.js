const healthController = (req, res) => {
    res.status(200).json({status: "ok", service: "api-gateway", uptime: process.uptime()});
}