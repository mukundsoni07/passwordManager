import mongoose from "mongoose";

const passwordSchema = mongoose.Schema(
  {
    platform: {
      type: String,
      required: true,
      trim: true
    },
    username: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    iv: {
      type: String,
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true
  }
);

export const Password = mongoose.model("Password", passwordSchema);
