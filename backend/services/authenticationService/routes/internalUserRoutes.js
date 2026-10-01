const express = require("express");

const {
    getInternalUserById
} = require("../controllers/internalUserController");

const router = express.Router();

router.get("/users/:userId", getInternalUserById);

module.exports = router;