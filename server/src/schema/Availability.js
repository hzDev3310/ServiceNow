const { Schema } = require("mongoose");

const Availability = new Schema({
    isAvailable: {
      type: Boolean,
      default: true,
    },
    from: String,
    to: String,
  });
  module.exports = Availability;