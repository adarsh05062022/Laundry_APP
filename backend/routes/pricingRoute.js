import express from "express";
import PricingModel from "../models/Pricing.js";

const router = express.Router();

/* This code snippet defines a route in an Express router to handle a GET request to retrieve the
current pricing information. Here's a breakdown of what the code is doing: */
// Route to get the current pricing
router.get("/", async (req, res) => {
  try {
    const pricing = await PricingModel.findOne();

    if (!pricing) {      
      return res.status(404).json({ message: "No pricing found" });
    }
    res.status(200).json(pricing);
  } catch (error) {
    // res.status(500).json({ message: error.message });
  }
});


/* This code snippet defines a route to update the pricing information. Here's a breakdown of what the
code is doing: */
// Route to update the pricing
router.put("/", async (req, res) => {
  const { regular, special, woolen,household } = req.body;

  try {
    const pricing = await PricingModel.findOne();
    if (!pricing) {
      // Create a new pricing document if it doesn't exist
      const newPricing = new PricingModel({ regular, special, woolen,household });
      await newPricing.save();
      res.status(201).json(newPricing);
    } else {
      // Update the existing pricing document
      pricing.regular = regular;
      pricing.special = special;
      pricing.woolen = woolen;
      pricing.household = household;
      await pricing.save();
      res.status(200).json(pricing);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
