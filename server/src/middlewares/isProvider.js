const userModel = require("../models/Users");

const isProviderMiddleware = async (req, res, next) => {
  try {
    const { phoneNumber, code } = req.body;

   

    const user = await userModel.findOne({ "phoneNumber.number": phoneNumber });

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    if (!user.isProvider) {
      if (user.phoneNumber.isVerifiate) {
        next();
      } else if (user.phoneNumber.code === code) {
        await userModel.findOneAndUpdate(
          { "phoneNumber.number": phoneNumber },
          { $set: { "phoneNumber.isVerifiate": true } }
        );
        next();
      } else {
        return res.status(400).json({ message: "Incorrect code" });
      }
    } else {
      if (user.email.isVerifiate) {
        next();
      } else if (user.email.code === code) {
        await userModel.findOneAndUpdate(
          { "phoneNumber.number": phoneNumber },
          { $set: { "email.isVerifiate": true } }
        );
        next();
      } else {
        return res.status(400).json({ message: "Email not verified" });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = isProviderMiddleware;
