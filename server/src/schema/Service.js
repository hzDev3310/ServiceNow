const { Schema } = require("mongoose");

const Comment = require("./Comment");
const Rating = require("./Rating");
const Availability = require("./Availability");
const Location = require("./Loaction");

const Service = new Schema({
  ProviderName: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  location: {
    type: Location,
  },
  profilPic: {
    type: String,
    default: "",
  },

  certification: {
    type: String,
    default: "",
  },
  serviceName: {
    type: String,
    required: true,
  },
  rating: {
    type: Rating,
    default: {
      total: 0,
      numberOfUsers: 0,
      average: 0,
    },
  },

  description: {
    type: String,
    default: "",
  },
  experience: Number,
  availability: {
    type: Availability,
    default:  {
      isAvailable: true,
      days: {
          monday: true,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: true,
          saturday: true,
          sunday: true
      }
  },
  },
  comments: {
    type: [Comment],
    default: [],
  },
 
});
module.exports = Service;
