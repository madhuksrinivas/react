import rateLimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await rateLimit.limit("global");
    if (!success) {
      console.warn("Rate limit exceeded");
      return res
        .status(429)
        .json({ message: "Too many requests. Please try again later." });
    }
    next();
  } catch (error) {
    console.error("Rate limiting error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default rateLimiter; // Express middleware

/*
"global" is the key — every request shares the same counter (one bucket for all users/IPs). You could change this to req.ip to limit per individual user instead.
If success is false (limit exceeded) → responds with 429 Too Many Requests.
If success is true → calls next() to continue to the actual route handler.
*/
