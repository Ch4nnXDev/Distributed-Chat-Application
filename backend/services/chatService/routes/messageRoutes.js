const express = require('express');
const { getMessages }  = require('../controllers/messageDBController');
const router = express.Router();

router.get(
    '/conversations/:conversationId/messages',
    getMessages
);


module.exports = router;