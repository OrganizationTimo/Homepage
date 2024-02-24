import { Request, Response, NextFunction } from "express";

function log(req: Request, res: Response, next: NextFunction) {
  console.log(`Requested: ${req.originalUrl}`);
  next();
}

export { log };
