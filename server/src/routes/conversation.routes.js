const {
    createNewConversation,
    getConv,

} = require("../controller/messagesController");

const router = require("express").Router();
router.post("/", createNewConversation);
router.get("/:id", getConv);

module.exports = router;
