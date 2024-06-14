const userModel = require("../models/Users");
const bcrypt = require("bcrypt");
const adminModel = require("../models/Admin");
const AdminKey = require("../models/Adminkey");
const ReportsModel = require("../models/Reports");


require("dotenv").config();
const jwt = require("jsonwebtoken");


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
  const rejectVerifcation =  async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      user.service.certification = "";
      await user.save();
      res.json({ message: "Provider rejected successfully", user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error " + error });
    }
  } 

const generateAdminKey = async (req, res) => {
  try {
      const key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      await AdminKey.create({ key });
      res.json(key)
  } catch (error) {
      res.status(500).json({ message: "Internal server error" , error });
  }
};

const signup = async (req, res) => {
  try {
    const { name, phoneNumber, password, email } = req.body;

    // Check if email already exists
    const existingEmail = await adminModel.findOne({ email });
    if (existingEmail) {
      return res.status(401).json({ message: "Email already exists" });
    }

    // Check if phone number already exists
    const existingPhoneNumber = await adminModel.findOne({ phoneNumber });
    if (existingPhoneNumber) {
      return res.status(401).json({ message: "Phone number already exists" });
    }

    const adminKey = req.adminKey;

    // Activate admin key
    const adminKeyToUpdate = await AdminKey.findOne({ key: adminKey });
    if (!adminKeyToUpdate) {
      return res.status(401).json({ message: "Invalid admin key" });
    }
    adminKeyToUpdate.isActive = true;
    await adminKeyToUpdate.save();

    const cryptedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new adminModel({
      name,
      email,
      password: cryptedPassword,
      phoneNumber
    });

    await newAdmin.save();

    res.status(200).json("Account created successfully" );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    let { username, password } = req.body;

    // Check if the identifier is a valid phone number
    const isEmail =username.includes("@");
    let admin;
    if (!isEmail) {
      // Search for admin using phone number
      admin = await adminModel.findOne({ phoneNumber: username });
    } else {
      // Search for admin using email
      admin = await adminModel.findOne({ email: username });
    }

    if (!admin) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, admin.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ id: admin._id }, process.env.ACCESS_TOKEN_SECRET);
    return res.json({ token, id: admin._id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const dashboard = async (req, res) => {
  try {
    const cities = [
      'tunis', 'sfax', 'sousse', 'ettadhamen', 'kairouan', 'bizerte', 'gabès', 'ariana',
      'gafsa', 'el mourouj', 'kasserine', 'monastir', 'la goulette', 'jendouba', 'zarzis',
      'douane', 'hammam-lif', 'el kef', 'houmt souk', 'gabès', 'mateur', 'gremda',
      'el hamma', 'menzel bourguiba'
    ];

    const usersValue = [];

    for (const city of cities) {
      const count = await userModel.countDocuments({ 'location.cityName': city });
      usersValue.push({ city, count });
    }

    // Sort the cities and their values from highest to lowest count
    usersValue.sort((a, b) => b.count - a.count);

    // Extract sorted cities and counts into separate arrays
    const sortedCities = usersValue.map(item => item.city);
    const sortedCounts = usersValue.map(item => item.count);

    const serviceProviders = await userModel.countDocuments({ isProvider: true });
    const clients = await userModel.countDocuments({ isProvider: false });
    const totalUsers = await userModel.countDocuments();
    const admins = await adminModel.countDocuments();
    const reports = await ReportsModel.countDocuments();

    const providers =  Math.round((100* serviceProviders) /totalUsers)
    const users = Math.round((100* clients) /totalUsers)
    return res.json({ providers : [providers ,users], users: [users , providers], totalUsers, admins, usersValue: [{name : "users",data :sortedCounts.slice(0,8)}], cities: sortedCities ,reports });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getAdmin = async (req,res)=>{
  try {
    const id= req.params.id
    const admin = await adminModel.findById(id)
    if(!admin) {
      return res.json({message : "admin not exist"})
    }
    else res.json(admin)
  } catch (error) {
    res.status(500).json({ message: "Internal server error" , error });
  }
}




  module.exports = {acceptVerifcation,generateAdminKey,signup,login,dashboard,getAdmin ,rejectVerifcation}
  

