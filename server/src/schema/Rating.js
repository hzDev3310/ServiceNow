const { Schema } = require("mongoose");

const Rating = new Schema({
    total: {
      type: Number,
      default: 0,
    },
    numberOfUsers: {
      type: Number,
      default: 0,
    },
    average: {
      type: Number,
      default: function () {
        return this.total / this.numberOfUsers || 0;
      },
    },
  });
  module.exports = Rating;