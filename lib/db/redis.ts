import Redis from "ioredis";

const globalForRedis = globalThis as typeof globalThis & {
  redisClient?: Redis;
};

export function getRedis() {
  if (!process.env.REDIS_URL) {
    throw new Error("REDIS_URL is not configured.");
  }

  globalForRedis.redisClient ??= new Redis(process.env.REDIS_URL, {
    maxRetriesPerRequest: 2
  });

  return globalForRedis.redisClient;
}
