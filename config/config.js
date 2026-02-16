require('dotenv').config();
const mongoose = require("mongoose");
require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      family: 4,
      bufferCommands: false
    });

    await mongoose.connection.db.admin().command({ ping: 1 });

    console.log(" MongoDB Connected & Pinged successfully!");

  } catch (err) {
    console.error(" MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;   // ✅ EXPORT FUNCTION
