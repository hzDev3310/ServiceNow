const ConversationModel = require("../models/Conversation");
const MessageModel = require("../models/Messages");


const createNewConversation = async (req, res) => {
  try {
    const { users } = req.body;
    const conv = await ConversationModel.findOne({ users });
    if (conv) {
      return res.status(200).json({convId : conv._id});
    }
    const newConversation = new ConversationModel({ users });
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
    const conv = await ConversationModel.find({ users: { $elemMatch: { $eq: id } } })
                                        .sort({ updatedAt: -1 });

    if (!conv || conv.length === 0) {
      return res.json({ message: "you have no Conversation yet !" });
    }
    res.status(200).json(conv);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


const addNewMessage = async (req, res) => {
  try {
    const { convId, sender, content } = req.body;
    const conv = await ConversationModel.findById(convId);
    
    if (!conv) {
      return res.status(404).json({ message: "Conversation not found" });
    }
    
    const message = new MessageModel({
      sender,
      content,
      convId
    });

    conv.updatedAt = Date.now();
    conv.lastMessage = message
    await message.save();
    await conv.save();

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
    messages = await MessageModel.find({ convId: req.params.id });
    res.json(messages)
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}


module.exports = { createNewConversation, addNewMessage, getConv, getMessages };
