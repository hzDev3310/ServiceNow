const { Schema } = require("mongoose");

const Mail = new Schema({
    emailAddress: String,
    code: Number,
    isVerifiate: {
      type: Boolean,
      default: false,
    },
  });
  module.exports = Mail;