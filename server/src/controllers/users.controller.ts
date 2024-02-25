import { Request, Response, NextFunction } from "express";
import userModel from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function registerUser(req: Request, res: Response, next: NextFunction) {
  try {
    const data = req.body;

    if (data.password !== data.confirmPassword)
      return res.status(400).json({ message: "Passwords do not match." });

    const hashedPassword = await bcrypt.hash(data.password, 10);
    console.log(hashedPassword);

    const user = new userModel({
      displayName: data.displayName,
      username: data.username,
      email: data.email,
      password: hashedPassword,
    });

    await user.save();
    return res.status(200).json({ message: "Sucessfully created account!" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Failed to create account." });
  }
}

async function loginUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, password } = req.body;

    const user = await userModel.findOne({ username });

    if (!user) return res.status(400).json({ message: "User does not exist." });

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch)
      return res.status(400).json({ message: "Invalid password." });

    if (process.env.JWT_SECRET) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      return res.json({ token });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Failed to login." });
  }
}

async function protectedRoute(req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json({ message: "You are authorized." });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Failed to login." });
  }
}

export { registerUser, loginUser, protectedRoute };
