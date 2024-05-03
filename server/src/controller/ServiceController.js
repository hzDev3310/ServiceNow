const code = require("../services/verificationCode");
const userModel = require("../models/Users");
const calculateDistance = require("../services/calculateDistance");

const getServices = async (req, res) => {
  try {
    let services;

    // Check if latitude and longitude are provided
    if (req.params && req.params.latitude && req.params.longitude) {
      const { latitude, longitude } = req.params;

      // Fetch services with location and sort by rating and distance
      services = await userModel.find({ isProvider: true })
        .select('service')
        .sort({ 'service.rating.average': -1 })
        .lean(); // Use lean() to get plain JavaScript objects instead of Mongoose documents
      
      // Calculate distance for each service and sort by distance
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
    } else {
      // Fetch services without location
      services = await userModel.find({ isProvider: true }).select('_id service');
    }

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
      return res.status(400).json({ error: "Email already exists" });
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

    res.json({ message: "Service added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error " + error });
  }
};

module.exports = { emproveAccount, getServices };
