require("dotenv").config();
const connectDB = require("./config/config");
const express = require("express");
const cors = require("cors");

const contactRoutes = require("./routes/contactRoutes");
const userRoutes = require("./routes/userRoute");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: [
    // "http://localhost:5173",   // local dev
    "https://real-state-frontend-idb183gdk-aakashs-projects-e83c607b.vercel.app" // later
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

app.use("/api/contact", contactRoutes);
app.use("/api/users", userRoutes);
app.use("/", (req, res) => {
  res.json({ message: "API is running" });
});
//  FIXED SERVER START
const startServer = async () => {
  try {
    await connectDB();  //  FIXED HERE

    app.listen(port, () => {
      console.log(`🚀 Server running on https://real-state-backend-4bz6.onrender.com}`);
      // console.log(`🚀 Server running on http://localhost:${port}`);
    });

  } catch (err) {
    console.error(" Failed to start:", err);
    process.exit(1);
  }
};

startServer();
