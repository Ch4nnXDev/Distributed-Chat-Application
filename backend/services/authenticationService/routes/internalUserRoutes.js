const express = require("express");

const {
    getInternalUserById,
    getInternalAllUsers
} = require("../controllers/internalUserController");

const router = express.Router();

router.get("/users/:userId", getInternalUserById);
router.get("/users", getInternalAllUsers);

module.exports = router;