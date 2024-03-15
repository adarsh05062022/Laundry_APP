/* This JavaScript code is setting up a server using Express.js framework. Here's a breakdown of what
each part of the code is doing: */

import express from "express";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import laundryRoutes from "./routes/laundryRoute.js";
import pricingRoutes from "./routes/pricingRoute.js";
import cors from 'cors';
import authenticateToken from "./middleware/authenticateToken.js"
import dotenv from 'dotenv';

dotenv.config()

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

// Connect to database
connectDB();

// Add CORS middleware
app.use(cors());
/* These lines of code are setting up routes for different parts of the application. Here's a breakdown
of what each line is doing: */

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/pricing',authenticateToken, pricingRoutes);
app.use('/api/laundry',authenticateToken, laundryRoutes);

/* The `app.listen(PORT, () => { console.log("Server is running on port 3000"); });` code is starting
the server and making it listen for incoming requests on the specified port. In this case, it is
listening on port 3000. When the server starts running and is successfully listening on the
specified port, it will log a message to the console saying "Server is running on port 3000". */
app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
