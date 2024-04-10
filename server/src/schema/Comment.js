const { Schema } = require("mongoose");

const Comment = new Schema({
  userImage: String,
  userName: String,
  content: String,
});
module.exports = Comment;
