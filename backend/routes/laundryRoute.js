import express from "express";


import LaundryEntry from "../models/Laundry.js";

const router = express.Router();

/* This code snippet defines a route in an Express router to handle a POST request to add a new laundry
entry. When a POST request is made to the specified route ("/"), it creates a new instance of the
`LaundryEntry` model using the data from the request body (`req.body`). It then saves this new entry
to the database using `newLaundryEntry.save()` and responds with a status of 201 (Created) along
with the saved entry in JSON format. */
// Route to add a new laundry entry
router.post("/", async (req, res) => {
  try {
    const newLaundryEntry = new LaundryEntry(req.body);
    const savedEntry = await newLaundryEntry.save();
    res.status(201).json(savedEntry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/* This code snippet defines a route in an Express router to handle a GET request to retrieve all
laundry entries. When a GET request is made to the specified route ("/"), it tries to fetch all
entries from the `LaundryEntry` model by using `LaundryEntry.find()`. If the operation is
successful, it responds with a status of 200 (OK) along with all the retrieved entries in JSON
format. */
// Route to get all laundry entries
router.get("/", async (req, res) => {
  try {
    const allEntries = await LaundryEntry.find();
    res.status(200).json(allEntries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* This code snippet defines a route in an Express router to handle a GET request to retrieve all
laundry entries for a particular user. */
// Route to get all laundry entries for a particular user
router.get('/user/:userId', async (req, res) => {
  const userId = req.params.userId; // Get user ID from URL parameter
  try {
    // Find all laundry entries for the specified user ID
    const userLaundryEntries = await LaundryEntry.find({ userId: userId });
    res.status(200).json(userLaundryEntries);
  } catch (err) {
    console.error(err);
    // res.status(500).json({ message: 'Internal server error' });
  }
});
  
// Route to update a laundry entry by ID
/* This code snippet defines a route in an Express router to handle a PUT request to update a specific
laundry entry by its ID. Here's a breakdown of what the code does: */
router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEntry = req.body;

    // Find the entry by ID and update it
    const result = await LaundryEntry.findByIdAndUpdate(id, updatedEntry, { new: true });

    if (!result) {
      return res.status(404).json({ message: 'Laundry entry not found' });
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Define route to delete a specific laundry entry by ID
/* This code snippet defines a route in an Express router to handle a DELETE request to delete a
specific laundry entry by its ID. Here's a breakdown of what the code does: */
router.delete('/delete/:id', async (req, res) => {
  try {
    // Extract the ID from the request parameters
    const id = req.params.id;
    
    // Find the laundry entry by ID and delete it
    const deletedEntry = await LaundryEntry.findByIdAndDelete(id);
    
    if (!deletedEntry) {
      // If the entry with the given ID does not exist, return a 404 error
      return res.status(404).json({ message: 'Laundry entry not found' });
    }
    
    // If the entry is deleted successfully, return a success message
    res.json({ message: 'Laundry entry deleted successfully', deletedEntry });
  } catch (error) {
    // If an error occurs, return a 500 error with the error message
    res.status(500).json({ message: error.message });
  }
});


export default router;
