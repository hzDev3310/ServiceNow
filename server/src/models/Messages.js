const { Schema, model } = require("mongoose");

const Message = new Schema(
    {
        convId:String,
        sender: String,
        content: String,
    },
    { timestamps: true }
)



const MessageModel = model("Message", Message);
module.exports = MessageModel;