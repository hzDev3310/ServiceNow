const { Schema } = require("mongoose");

const Message = new Schema(
    {
        convId:String,
        sender: String,
        content: String,
    },
    { timestamps: true }
)

module.exports = Message