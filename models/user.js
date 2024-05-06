const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  about: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profilePic: { type: String, required: false },
  socialMedia: { type: Array, required: false },
  passwordHash: { type: String, required: true },
});

const User = mongoose.model("users", userSchema);

module.exports = User;