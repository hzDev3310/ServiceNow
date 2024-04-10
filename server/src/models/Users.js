const { model, Schema } = require("mongoose");

const PhoneNumber = require("../schema/PhoneNumber");
const Mail = require("../schema/Mail");


const Service = require("../schema/Service");
const Location = require("../schema/Loaction");

const userSchema = new Schema({
  name: {
    type: String,
  },
  phoneNumber: {
    type: PhoneNumber,
    required: true,
  },
  password: {
    type: String,
  },
  profilPic: {
    type: String,
    default: "",
  },
  location: {
    type: Location,
  },
  isProvider: {
    type: Boolean,
    default: false,
  },
  email: {
    type: Mail,
  },
  service: {
    type: Service,
  },
});

const userModel = model("User", userSchema);
module.exports = userModel;
