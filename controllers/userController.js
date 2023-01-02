import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { name, email, password, pic } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(500).json({ message: "User already exists" });
    }
    let salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const result = await User.create({
      email,
      password: hashedPassword,
      name: name,
      pic,
    });
    const token = jwt.sign(
      { email: result.email, id: result.id },
      process.env.SECRET,
      {
        expiresIn: "30d",
      }
    );
    res.status(201).json({ result, token });
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
    console.log(err);
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser)
      return res.status(500).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(500).json({ message: "Invalid Credentials" });

    const token = jwt.sign(
      { email: oldUser.email, id: oldUser._id },
      process.env.SECRET,
      {
        expiresIn: "30d",
      }
    );
    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
    console.log(err);
  }
};

export const allUsers = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
  } catch (err) {
    console.log(err);
  }
};
