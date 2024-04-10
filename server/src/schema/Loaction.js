const { Schema } = require("mongoose");

const Location = new Schema({
    latitude: Number,
    longitude: Number,
    cityName: String,
  });
  module.exports = Location;