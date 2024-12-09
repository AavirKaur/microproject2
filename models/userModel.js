import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js"; // Include the ".js" extension


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Email format is invalid"],
  },
  age: {
    type: Number,
    min: [18, "Age must be at least 18"],
    required: [true, "Age is required"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

const User = mongoose.model("User", userSchema);

export default User;
