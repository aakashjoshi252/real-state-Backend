const User = require("../models/user");

module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.json({ success: true });
  } catch (err) {
    console.error(err); // 🔴 ADD THIS
    res.status(500).json({ error: err.message }); // show real error
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (user) {
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
};
