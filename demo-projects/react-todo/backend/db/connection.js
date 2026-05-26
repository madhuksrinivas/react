import mongoose from "mongoose";

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI); // Connect to MongoDB using the URI (connection string) from .env
  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

export default connectDB;
