const express = require("express");

const router = express.Router();

const { readinessController } = require("../controllers/readinessController");
const {healthController} = require("../controllers/healthController")
router.get("/readiness", readinessController);
router.get("/health",)

module.exports = router;