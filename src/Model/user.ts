import { model, Schema } from "mongoose";
import { getHash } from "../Utils/bcrypt";
import { compareHash } from "../Utils/password";

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is Required !"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is Required !"],
  },
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await getHash(this.password);
  }
});

userSchema.methods.comparePassword = function (password: string) {
  return compareHash(password, this.password);
};

export const userModel = model("users", userSchema);
