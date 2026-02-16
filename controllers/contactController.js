const Contact = require("../models/contact");
const nodemailer = require("nodemailer");

module.exports.sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Save in DB
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    // Email Setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: "New Lead",
      text: `Name: ${name} Email: ${email} Message: ${message}`,
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
