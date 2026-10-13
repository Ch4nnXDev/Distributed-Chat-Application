const healthCheck  = (req, res) => {
    res.status(200).json({
        status: "OK",
        service: "api-gateway",
        uptime: process.uptime()


    })
}