const { Schema } = require("mongoose");

const Availability = new Schema({
  isAvailable: {
    type: Boolean,
    required: true
  },
  days: {
    monday: Boolean,
    tuesday: Boolean,
    wednesday: Boolean,
    thursday: Boolean,
    friday: Boolean,
    saturday: Boolean,
    sunday: Boolean
  }
});
module.exports = Availability;