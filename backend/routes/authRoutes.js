import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
const secretKey = "my-secret-key";

const router = express.Router();

/* This specific route `router.get("/user-details/:userId", async (req, res) => { ... }` is responsible
for fetching details of a specific user based on the provided `userId` parameter. Here's a breakdown
of what the code is doing: */
router.get("/user-details/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "request successful",
      user: {
        username: user.username,
        phone: user.phone,
        address: user.address,
        feedback: user.feedback,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* The code snippet you provided is defining a route for registering a new user in the application.
Here's a breakdown of what the code is doing: */
// register a user
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, isAdmin } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      isAdmin,
    });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

/* The `// login` section in the code snippet defines a route for handling user login functionality.
When a POST request is made to the `/login` endpoint, the server executes the logic to authenticate
the user based on the provided email and password. */
// login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate JWT token
    // You can use any library for JWT generation (e.g., jsonwebtoken)
    const token = jwt.sign({ userId: user._id, email: user.email }, secretKey, {
      expiresIn: "1d",
    });

    res.json({
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        // Add more user details as needed
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/* The code snippet you provided is defining a route for updating user details in the application.
Here's a breakdown of what the code is doing: */
// Route for updating user details
router.put("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const { phone, address, username, feedback } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user details if provided
    if (phone) user.phone = phone;
    if (address) user.address = address;
    if (username) user.username = username;
    if (feedback) user.feedback = feedback;

    // Save the updated user
    await user.save();

    res
      .status(200)
      .json({ message: "User details updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* The `// Change Password` section in the code defines a route for changing a user's password. When a
POST request is made to the `/change-password` endpoint, the server executes the logic to change the
user's password. */
// Change Password
router.post("/change-password", async (req, res) => {
  try {
    const { userId, currentPassword, newPassword } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare current password
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password
    user.password = hashedNewPassword;
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/* The `// Logout` section in the code defines a route for handling user logout functionality. When a
POST request is made to the `/logout` endpoint, the server can implement the logout logic. In this
case, it is mentioned that if you are using JWT tokens, you can invalidate the token and clear it
from the client-side (e.g., remove it from local storage or cookie). */
// Logout
router.post("/logout", (req, res) => {
  // You can implement logout logic here
  // For example, if you're using JWT tokens, you can invalidate the token
  // and clear it from the client-side (e.g., remove it from local storage or cookie)

  // For demonstration purposes, let's assume the logout is successful
  res.json({ message: "Logout successful" });
});

/* This specific route `router.get("/users", async (req, res) => { ... }` is responsible for fetching
all user details from the database and returning them as a JSON response. */
router.get("/users", async (req, res) => {
  try {
    // Fetch all user details from the database
    const users = await User.find();

    res.json({ users: users });
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
});

export default router;
