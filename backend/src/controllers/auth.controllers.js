import User from "../models/user.model.js";
import { generateToken } from "../lib/utils.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if(!fullName || !email || !password) 
        return res
           .status(400)
           .json({message:"All fiels must be filled"})
    if (password < 6)
      return res
        .status(400)
        .json({ message: "Password must be at least 6 character long" });
    const user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ message: "A user already exist with this email" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      //generate JWT token
      generateToken(newUser._id, res);
      await newUser.save(); // saves the new user in db

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in Signup Controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = (req, res) => {
  res.send("Signup Route");
};

export const logout = (req, res) => {
  res.send("Signup Route");
};
