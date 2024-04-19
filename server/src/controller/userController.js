const code = require("../services/verificationCode");
const userModel = require("../models/Users");
const bcrypt = require("bcrypt");
const calculateDistance = require("../services/calculateDistance");

const getServices = async (req, res) => {
  try {
    if (!req.params) {
      const services = await userModel.find({ isProvider: true }).select('service');
      res.json(services);
      return;
    }

    const { latitude, longitude, serviceName } = req.params;
    let services = [];
    if (serviceName === "all") {
      services = await userModel.find({ isProvider: true }).select('service');
    } else {
      services = await userModel.find({ isProvider: true, "service.serviceName": serviceName }).select('service');
    }


    services.sort((a, b) => b.service.rating.average - a.service.rating.average);

    services.sort((a, b) => {
      const distanceToA = calculateDistance(
        latitude,
        longitude,
        parseFloat(a.service.location.latitude),
        parseFloat(a.service.location.longitude)
      );
      const distanceToB = calculateDistance(
        latitude,
        longitude,
        parseFloat(b.service.location.latitude),
        parseFloat(b.service.location.longitude)
      );
      return distanceToA - distanceToB;
    });

    res.json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error " + error });
  }
};


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
    const {value} = req.body
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
      default:
        return res.status(400).json({ message: "Invalid attribute" });
    }
    await user.save();
    res.json({ message: `${attribute} updated successfully`, user });
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
  getServices,
  updateUser,
  removeUser,
  getuser,
  getOtherUser
};
