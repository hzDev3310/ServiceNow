const bcrypt = require("bcrypt");
const userModel = require("../models/Users");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const newCode = require("../services/verificationCode");
const sendSMS = require("../services/sendSms");

const signup = async (req, res) => {
  try {
    const { name, number, password, location } = req.body;
    const verifiedNumber = await userModel.findOne({
      "phoneNumber.number": number,
    });

    if (verifiedNumber) {
      return res.status(400).json({message :"Phone number already exists"});
    } else {
      const code = newCode();
      sendSMS(number, code);
      const cryptedPassword = bcrypt.hashSync(password, 10);
      const newUser = new userModel({
        name,
        location,
        password: cryptedPassword,
        phoneNumber: {
          number,
          code,
          isVerifiate: false,
        },
      });
      await newUser.save();
      res.status(400).json({message :"account created successfully"});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    const user = await userModel.findOne({ "phoneNumber.number": phoneNumber });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(404).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET);
    return res.json({token,userId :  user._id});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};






module.exports = { signup, login  };
