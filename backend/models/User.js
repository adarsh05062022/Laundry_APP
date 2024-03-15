import mongoose from 'mongoose';

/* This code snippet is defining a Mongoose schema for a user in a MongoDB database. Here's a breakdown
of the schema: */
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email:{type:String,required:true,unique:true},
  isAdmin:{type:Boolean,required:true},
  phone:{type:String},
  address:{type:String},
  feedback:{type:String}
  
});

const User = mongoose.model('User', userSchema);

export default User;