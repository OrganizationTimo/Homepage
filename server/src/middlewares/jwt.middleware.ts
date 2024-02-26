import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header("Authorization");

  if (!token) return res.status(403).json({ message: "No token provided." });

  if (process.env.JWT_SECRET) {
    try {
      const tokenString = token?.split(" ")[1];
      jwt.verify(tokenString, process.env.JWT_SECRET);

      next();
    } catch (err) {
      console.log(err);
      if (err instanceof jwt.TokenExpiredError) {
        return res
          .status(401)
          .json({ message: "Token expired. " + err.expiredAt });
      }
      if (err instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({ message: "Invalid token." });
      }
    }
  } else {
    return res
      .status(500)
      .json({ message: "Internal server error. JWT_SECRET not defined." });
  }
}
