const healthCheck = async (req, res) => {
    return res.status(200).json({status : "Healthy"});
}

module.export = {
    healthCheck
}