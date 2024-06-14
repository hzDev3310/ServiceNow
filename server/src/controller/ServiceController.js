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

const getproviders = async (req, res) => {
  try {
    // Fetching inactive providers who have a service defined and are marked as providers
    const inactiveProviders = await userModel.find({ service: { $exists: true }, isProvider: false });
    
    // Sending the inactive providers as a JSON response
    res.json(inactiveProviders);
  } catch (error) {
    // Sending a 500 Internal Server Error status with an error message
    res.status(500).json({ message: "Internal server error", error: error.message });
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

const deleteService = async (req, res) => {
  const { id } = req.params;
  console.log(id)
  try {
    // Find the user by id
    const user = await userModel.findById(id);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user has the 'service' field
    if (!user.service) {
      return res.status(400).json({ message: "User does not have a service object" });
    }

    // Remove the 'service' object
    delete user.service;

    // Update the user's 'isProvider' field
    user.isProvider = false;

    // Save the updated user document
    await user.save();

    // Respond with a success message
    res.json({ message: "Service object deleted successfully", user });

  } catch (error) {
    // Handle any errors that occur
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};





module.exports = { emproveAccount, getServices, getproviders, deleteService };
