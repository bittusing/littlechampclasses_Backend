import "dotenv/config";

export const env = {
  port: Number(process.env.PORT) || 4100,
  mongoUri: process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/littlechampclasses",
  jwtSecret: process.env.JWT_SECRET ?? "dev-only-change-me",
  frontendUrl: process.env.FRONTEND_URL ?? "http://localhost:3000",
};
