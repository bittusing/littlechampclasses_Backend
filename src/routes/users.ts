import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { User } from "../models/User.js";
import { asyncHandler } from "../util/asyncHandler.js";

export const usersRouter = Router();

usersRouter.get(
  "/me",
  requireAuth,
  asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId).select("email name createdAt").lean();
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  res.json({
    user: {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    },
  });
  }),
);
