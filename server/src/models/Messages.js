const {  model } = require("mongoose");
const Message = require("../schema/Message")

const MessageModel = model("Message", Message);
module.exports = MessageModel;