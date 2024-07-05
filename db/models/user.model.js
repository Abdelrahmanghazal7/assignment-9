import { Schema, model } from "mongoose";

const userSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  OTP: {
    type: String,
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
});

const userModel = model("user", userSchema);

export default userModel;
