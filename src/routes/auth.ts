import bcrypt from "bcryptjs";
import { Router } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { env } from "../env.js";
import { User } from "../models/User.js";
import { asyncHandler } from "../util/asyncHandler.js";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1).max(120),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const authRouter = Router();

function signToken(userId: string, email: string) {
  return jwt.sign({ sub: userId, email }, env.jwtSecret, { expiresIn: "14d" });
}

authRouter.post(
  "/register",
  asyncHandler(async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten().fieldErrors });
    return;
  }
  const { email, password, name } = parsed.data;
  const existing = await User.findOne({ email });
  if (existing) {
    res.status(409).json({ error: "An account with this email already exists" });
    return;
  }
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hash, name });
  const token = signToken(user._id.toString(), user.email);
  res.status(201).json({
    token,
    user: { id: user._id.toString(), email: user.email, name: user.name },
  });
  }),
);

authRouter.post(
  "/login",
  asyncHandler(async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten().fieldErrors });
    return;
  }
  const { email, password } = parsed.data;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }
  const token = signToken(user._id.toString(), user.email);
  res.json({
    token,
    user: { id: user._id.toString(), email: user.email, name: user.name },
  });
  }),
);
