const { getConversations, createConversation, getConversation, removeParticipant, addParticipant, deleteConversation } = require("../controllers/conversationDBController");
const express = require('express');


const router = express.Router();

router.post("/", createConversation);
router.get("/", getConversations);
router.get("/:conversationId", getConversation);

router.post("/:conversationId/participants/:userId", addParticipant);
router.delete("/:conversationId/participants/:userId", removeParticipant);


router.delete("/:conversationId", deleteConversation);
module.exports = router;



