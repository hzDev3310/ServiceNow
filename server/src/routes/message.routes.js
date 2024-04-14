const {
  addNewMessage,
  createNewConversation,
  getConv,
  getMessages,
} = require("../controller/messagesController");

const router = require("express").Router();
router.post("/", createNewConversation);
router.get("/:id", getConv);
router.post("/:id", addNewMessage);
router.get('/:id/messages',getMessages)

module.exports = router;
