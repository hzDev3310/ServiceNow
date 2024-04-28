const code = require("../services/verificationCode");
const userModel = require("../models/Users");
const calculateDistance = require("../services/calculateDistance");

const getServices = async (req, res) => {
  try {
    if (!req.params) {
      const services = await userModel.find({ isProvider: true }).select('service');
      res.json(services);
      return;
    }

    const { latitude, longitude } = req.params;
    
    
    let services = await userModel.find({ isProvider: true }).select('service');

    
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


const emproveAccount = async (req, res) => {
  try {
    const { userId } = req.params;
    const { email, serviceName, description, experience } =
      req.body;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const verifiedEmail = await userModel.findOne({
      "service.email.emailAddress": email,
    });
    if (verifiedEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const Email = {
      emailAddress: email,
      code: code(),
    };
    user.service = {
      ProviderName: user.name,
      phoneNumber: user.phoneNumber.number,
      profilPic: user.profilPic,
      location: user.location,

      serviceName,
      description,
      experience,
    };
    user.email = Email;

    await user.save();

    res.json({ message: "Service added successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error " + error });
  }
};

module.exports = { emproveAccount, getServices };
