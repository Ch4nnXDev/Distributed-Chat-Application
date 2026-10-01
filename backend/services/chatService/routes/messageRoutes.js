const express = require('express');
const { getMessages }  = require('../controllers/messageDBController');
const authenticate  = require('../middleware/authenticate');
const router = express.Router();

router.get(
    '/conversations/:conversationId/messages',
    authenticate,
    getMessages
);


module.exports = router;