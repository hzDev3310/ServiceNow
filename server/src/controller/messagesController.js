const ConversationModel = require("../models/Conversation");
const MessageModel = require("../models/Messages");
const UserModel = require("../models/Users");

const createNewConversation = async (req, res) => {
  try {
    const { id1, id2 } = req.body;
    const conv = await ConversationModel.findOne({ users: [id1, id2] });
    if (conv) {
      return res.status(200).json(conv);
    }
    const newConversation = new ConversationModel({ users: [id1, id2] });
    await newConversation.save();
    res.status(200).json({ message: "Conversation created successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};



const getConv = async (req, res) => {
  try {
    const { id } = req.params;
    const conv = await ConversationModel.find({ users: { $elemMatch: { $eq: id } } });

    if (!conv || conv.length === 0) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    res.status(200).json(conv);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

const addNewMessage = async (req, res) => {
  try {
    const {convId} = req.params
    const {  sender, content } = req.body;
    const message = new MessageModel({
      sender,
      content,
      convId
    })
    await message.save()
    res.status(200).json({ message: "Message added successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getMessages = async (req, res) => {
  try {
    const { convId } = req.params
    messages = await MessageModel.find({convId});
    res.json(messages)
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}


module.exports = { createNewConversation, addNewMessage, getConv ,getMessages};
