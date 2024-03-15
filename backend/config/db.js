/**
 * The function `connectDB` establishes a connection to a MongoDB database using the URL provided in
 * the environment variables.
 */
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config()

export const connectDB = async () => {
  try {
    const conn = await mongoose
      .connect(process.env.MONGODB_URL)
      .then(() => {
        console.log(`MongoDB Connected`);
      })
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};
