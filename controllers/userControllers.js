import User from "../models/userModel.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, age, isAdmin } = req.body;

    const newUser = new User({ name, email, age, isAdmin });
    await newUser.save();

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
