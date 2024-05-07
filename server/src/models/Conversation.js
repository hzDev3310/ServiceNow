const { Schema, model } = require("mongoose");
const Message = require("../schema/Message");



const ConversationSchema = new Schema({
  users: Array,
  lastMessage : Message
},
  { timestamps: true }
);

const ConversationModel = model("Conversation", ConversationSchema);
module.exports = ConversationModel;
