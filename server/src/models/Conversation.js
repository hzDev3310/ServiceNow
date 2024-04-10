const { Schema, model } = require("mongoose");



const ConversationSchema = new Schema({
  users :Array,
});

const ConversationModel = model("Conversation", ConversationSchema);
module.exports = ConversationModel;
