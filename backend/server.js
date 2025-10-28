
// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User"); // Make sure you have this schema file

const app = express();
app.use(cors()); 
app.use(express.json());
// Connect to MongoDB (your connection string)
mongoose.connect("mongodb+srv://nithisha_30:nm2025gce@cluster0.hwraol0.mongodb.net/formDB?retryWrites=true&w=majority")
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// POST route to save user
app.post("/register", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
