const { Schema } = require("mongoose");

const PhoneNumber = new Schema({
    number: String,
    code: Number,
    isVerifiate: {
      type: Boolean,
      default: false,
    },
  });
  module.exports = PhoneNumber;