import { Request, Response, NextFunction } from "express";

async function getUsers(req: Request, res: Response, next: NextFunction) {
  try {
    return res.status(200).json({ message: "Hello anotehr!" });
  } catch (err) {
    console.log(err);
  }
}

export { getUsers };
