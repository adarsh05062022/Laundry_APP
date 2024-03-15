import mongoose from 'mongoose';

// Define the Pricing schema
/* This code snippet is defining a Mongoose schema for pricing information. The schema includes fields
for different types of clothing items and household items, each with their own pricing structure. */
const pricingSchema = new mongoose.Schema({
  regular: {
    upperwear: { type: Number, required: true },
    lowerwear: { type: Number, required: true },
  },
  special: {
    upperwear: { type: Number, required: true },
    lowerwear: { type: Number, required: true },
  },
  woolen: {
    upperwear: { type: Number, required: true },
    lowerwear: { type: Number, required: true },
  },
  household:{
    item:{type : Number,required:true}
  }
});

// Create the Pricing model
const PricingModel = mongoose.model('Pricing', pricingSchema);

export default PricingModel;
