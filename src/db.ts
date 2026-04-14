import mongoose from "mongoose";
import { env } from "./env.js";

/** Reuse connection across Vercel serverless invocations */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

const globalWithMongoose = globalThis as typeof globalThis & {
  __mongooseCache?: MongooseCache;
};

const cache: MongooseCache =
  globalWithMongoose.__mongooseCache ?? { conn: null, promise: null };
if (!globalWithMongoose.__mongooseCache) {
  globalWithMongoose.__mongooseCache = cache;
}

export async function connectDb(): Promise<typeof mongoose> {
  if (cache.conn) {
    return cache.conn;
  }
  if (!cache.promise) {
    cache.promise = mongoose.connect(env.mongoUri);
  }
  cache.conn = await cache.promise;
  return cache.conn;
}
