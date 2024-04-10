const userModel = require("../models/Users");

const acceptVerifcation =  async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      user.isProvider = true;
      await user.save();
      res.json({ message: "Provider accepted successfully", user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error " + error });
    }
  } 


  module.exports = acceptVerifcation
  

