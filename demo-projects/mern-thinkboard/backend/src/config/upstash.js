import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

dotenv.config();

// create rate limiter instance to 5 requests per 10 seconds
const rateLimit = new Ratelimit({
  redis: Redis.fromEnv(), // connects to Upstash Redis using env vars
  limiter: Ratelimit.slidingWindow(5, "10 s"), // 5 requests per 10 seconds
});

export default rateLimit;

/*
Stack: Upstash Redis + @upstash/ratelimit

Upstash is a serverless Redis service (cloud-hosted). 
The @upstash/ratelimit library uses it as a counter store, 
so limits persist across server restarts.

Redis.fromEnv() reads UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN from your .env.
Sliding window algorithm: counts requests in a rolling 10-second window, not a fixed one.
So if you send 5 requests at second 9, you can't send more until second 19 — it always looks back exactly 10 seconds.
*/
