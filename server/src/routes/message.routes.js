const {
  addNewMessage,
  getMessages,
} = require("../controller/messagesController");

const router = require("express").Router();

router.post("/", addNewMessage);
router.get('/:id',getMessages)

module.exports = router;
