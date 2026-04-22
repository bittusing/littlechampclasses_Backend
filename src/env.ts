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

function normalizeOrigin(url: string): string {
  const t = url.trim();
  if (!t) return t;
  try {
    const withScheme = t.includes("://")
      ? t
      : t.startsWith("localhost") || t.startsWith("127.")
        ? `http://${t}`
        : `https://${t}`;
    return new URL(withScheme).origin;
  } catch {
    return t.replace(/\/$/, "");
  }
}

export const env = {
  port: Number(process.env.PORT) || 4100,
  mongoUri: isDeployed
    ? requireEnv("MONGODB_URI", process.env.MONGODB_URI)
    : (process.env.MONGODB_URI ??
      "mongodb+srv://codeconnect123:codeconnect123@cluster0.ocxugzh.mongodb.net/littlechampjunior?retryWrites=true&w=majority"),
      // "mongodb://127.0.0.1:27017/littlechampclasses"),
  jwtSecret: isDeployed
    ? requireEnv("JWT_SECRET", process.env.JWT_SECRET)
    : (process.env.JWT_SECRET ?? "dev-only-change-me"),
  /** Comma-separated origins for CORS (no trailing path; www and apex listed separately if needed) */
  frontendOrigins: (() => {
    const list = frontendRaw
      .split(",")
      .map((s) => normalizeOrigin(s))
      .filter(Boolean);
    return list.length > 0 ? list : ["http://localhost:3000"];
  })(),
  /** Pepper for OTP code hashing. In development, defaults to `jwtSecret` if unset. */
  otpPepper: "" as string,
  otpTtlMs: Number(process.env.OTP_TTL_MS) || 5 * 60 * 1000,
  smsProvider: (process.env.SMS_PROVIDER ?? "mock").trim().toLowerCase(),
  razorpayKeyId: process.env.RAZORPAY_KEY_ID?.trim() ?? "",
  razorpayKeySecret: process.env.RAZORPAY_KEY_SECRET?.trim() ?? "",
  razorpayWebhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET?.trim() ?? "",
};

{
  const fromEnv = process.env.OTP_PEPPER?.trim();
  if (fromEnv) {
    env.otpPepper = fromEnv;
  } else if (isDeployed) {
    env.otpPepper = requireEnv("OTP_PEPPER", process.env.OTP_PEPPER);
  } else {
    env.otpPepper = env.jwtSecret;
  }
}
