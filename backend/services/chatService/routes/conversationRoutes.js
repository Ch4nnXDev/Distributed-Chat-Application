const { getConversations, createConversation, getConversation, removeParticipant, addParticipant } = require("../controllers/conversationDBController");
const express = require('express');


const router = express.Router();

router.post("/", createConversation);
router.get("/", getConversations);
router.get("/:conversationId", getConversation);

router.post("/:conversationId/participants/:userId", addParticipant);
router.delete("/:conversationId/participants/:userId", removeParticipant);

router.patch("/:conversationId", (req, res) => {
    res.status(200).json({ message: "Update conversation" });
});
router.delete("/:conversationId", (req, res) => {
    res.status(200).json({ message: "Delete conversation" });
});
module.exports = router;



