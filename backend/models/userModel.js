import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    profile_picture: {
      type: String,
    },
    password: {
      type: String,
      required: function () {
        return this.provider === "local";
      },
      select: false,
    },
    provider: {
      type: String,
      enum: ["local", "github", "google"],
      default: "local",
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: function () {
        return this.provider === "github" || this.provider === "google";
      },
      required: true,
    },
    otp: {
      type: String,
      default: null,
    },
    otpExpires: {
      type: Date,
      default: function () {
        return this.otp ? new Date(Date.now() + 10 * 60 * 1000) : null;
      },
    },
  },
  { timestamps: true }
);

const UserModel = model("User", userSchema);

export default UserModel;
