import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { User } from "../models/user.model";

async function registerUser(req: Request, res: Response, next: NextFunction) {
  try {
    type requestType = {
      username: string;
      email: string;
      password: string;
      confirmPassword: string;
    };

    const data: requestType = req.body;

    const userModel = new User();

    const user = await userModel.findExistingUser(data.username.toLowerCase());

    if (user)
      return res.status(400).json({ message: "User does already exists!" });

    if (data.password !== data.confirmPassword)
      return res.status(400).json({ message: "Passwords do not match." });

    const hashedPassword = await bcrypt.hash(data.password, 10);
    console.log(hashedPassword);

    await userModel.insertUser(
      data.username.toLowerCase(),
      data.email,
      hashedPassword
    );

    return res.status(200).json({ message: "Sucessfully created account!" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Failed to create account." });
  }
}

async function loginUser(req: Request, res: Response, next: NextFunction) {
  try {
    type requestType = {
      username: string;
      password: string;
    };
    const { username, password }: requestType = req.body;

    const userModel = new User();

    const user = await userModel.findExistingUser(username.toLowerCase());

    if (!user) return res.status(400).json({ message: "User does not exist." });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return res.status(400).json({ message: "Invalid password." });
    if (process.env.JWT_SECRET) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || "10m",
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
    return res.status(200).json({ message: "You are authorized." });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Failed to login." });
  }
}

export { registerUser, loginUser, protectedRoute };
