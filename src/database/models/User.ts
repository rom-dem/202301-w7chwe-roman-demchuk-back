import { model, Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  avatar: {
    type: String,
  },
});

const User = model("User", userSchema, "users");

export default User;
