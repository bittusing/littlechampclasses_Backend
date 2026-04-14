import "dotenv/config";

const isDeployed =
  Boolean(process.env.VERCEL) || process.env.NODE_ENV === "production";

function requireEnv(name: string, value: string | undefined): string {
  const trimmed = value?.trim();
  if (!trimmed) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return trimmed;
}

const frontendRaw = process.env.FRONTEND_URL ?? "http://localhost:3000";

export const env = {
  port: Number(process.env.PORT) || 4100,
  mongoUri: isDeployed
    ? requireEnv("MONGODB_URI", process.env.MONGODB_URI)
    : (process.env.MONGODB_URI ??
      "mongodb://127.0.0.1:27017/littlechampclasses"),
  jwtSecret: isDeployed
    ? requireEnv("JWT_SECRET", process.env.JWT_SECRET)
    : (process.env.JWT_SECRET ?? "dev-only-change-me"),
  /** Comma-separated URLs allowed by CORS (e.g. prod + preview frontends) */
  frontendOrigins: frontendRaw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
};
