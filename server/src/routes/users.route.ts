import express from "express";
import {
  loginUser,
  protectedRoute,
  registerUser,
} from "../controllers/users.controller";
import { verifyToken } from "../middlewares/jwt.middleware";

const router = express.Router();

router.post("/api/user/register", registerUser);
router.post("/api/user/login", loginUser);
router.get("/api/user/protected", verifyToken, protectedRoute);

export default router;
