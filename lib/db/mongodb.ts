import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

type CachedConnection = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalForMongoose = globalThis as typeof globalThis & {
  mongooseCache?: CachedConnection;
};

const cached = globalForMongoose.mongooseCache ?? { conn: null, promise: null };
globalForMongoose.mongooseCache = cached;

export async function connectMongo() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!uri) {
    throw new Error("MONGODB_URI is not configured.");
  }

  cached.promise ??= mongoose.connect(uri, {
    dbName: "educbc-pro"
  });

  cached.conn = await cached.promise;
  return cached.conn;
}
