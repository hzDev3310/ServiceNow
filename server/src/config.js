const mongoose = require("mongoose");


require("dotenv").config();

const dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hfg8skr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/${process.env.DB}`

const connectToDatabase = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    
  }
};




module.exports = {connectToDatabase };
