/* This code snippet is defining a Mongoose schema for a laundry entry in a laundry management system.
Here's a breakdown of what the code is doing: */
import mongoose from 'mongoose';

const laundryEntrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  pickupDate: {
    type: String
  },
  address: {
    type: String,
    required: true
  },
  cloths: {
    regular: {
      upperWear: { type: Number, required: true },
      lowerWear: { type: Number, required: true }
    },
    special: {
      upperWear: { type: Number, required: true },
      lowerWear: { type: Number, required: true }
    },
    woolen: {
      upperWear: { type: Number, required: true },
      lowerWear: { type: Number, required: true }
    },
    household:{
      item:{type:Number,required:true}
    }
  },
  deliveryOption: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  deliveryDate: {
    type: String
  }
});
      
      const LaundryEntry = mongoose.model('LaundryEntry', laundryEntrySchema);

export default LaundryEntry;