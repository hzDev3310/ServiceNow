  const { Schema } = require("mongoose");

  const Comment = new Schema({
    sender : String,
    content : String
  },{
    timestamps : true
  });
  module.exports = Comment;
