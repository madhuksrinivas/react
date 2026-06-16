import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";

dotenv.config();

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 5000;
const baseUrl = "/api/notes";

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // middleware - get access to req.body in controllers | it will parse JSON body of incoming requests and make it available under req.body
// simple custom middleware
app.use((req, res, next) => {
  console.log(`Request Method: ${req.method} \nRequest URL: ${req.url}`);
  next();
});
// another middleware eg - authentication, logging
app.use(rateLimiter);

app.use(baseUrl, notesRoutes);

connectDB().then(() => {
  const serverUrl = `https://${HOST}:${PORT}${baseUrl}`;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Access the notes at ${serverUrl}`);
  });
});
