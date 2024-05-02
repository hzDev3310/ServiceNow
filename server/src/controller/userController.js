const code = require("../services/verificationCode");
const userModel = require("../models/Users");
const bcrypt = require("bcrypt");




const removeUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userModel.findByIdAndDelete(userId);

    res.json("user removed succsefuly");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error " + error });
  }
};

const updateUser = async (req, res) => {
  try {
    const { userId, attribute } = req.params;
    const user = await userModel.findById(userId);
    const { value } = req.body
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    switch (attribute) {
      case "name":
        user.name = value;
        user.service ? user.service.ProviderName = value : null;
        break;
      case "location":
        user.location = value;
        user.service ? user.service.location = value : null;
        break;
      case "number":
        user.phoneNumber = {
          number: value,
          code: code(),
        };
        user.service ? user.service.phoneNumber = value : null;
        break;
      case "password":
        const cryptedPassword = bcrypt.hashSync(value, 10);
        user.password = cryptedPassword;
        break;

      case "rating":
        user.service.rating.numberOfUsers++;
        user.service.rating.total += value;
        break;
      case "email":
        user.email = {
          emailAddress: value,
          code: Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000,
        };
        break;
      case "serviceName":
        user.service.serviceName = value;
        break;
      case "certification":
        user.service.certification = value;
        break;
      case "availability":
        user.service.availability = value;
        break;
      default:
        return res.status(400).json({ message: "Invalid attribute" });
    }
    await user.save();
    res.json({ message: `${attribute} updated successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error " + error });
  }
};

const getuser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userModel.findById(userId);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error " + error });
  }
}

const getOtherUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id)
    res.json({
      name: user.name,
      pic: user.profilPic
    })
  } catch (error) {
    res.status(404).json(error)
  }
}

module.exports = {
  updateUser,
  removeUser,
  getuser,
  getOtherUser
};
