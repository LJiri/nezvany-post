import mongoose from "mongoose";

const completedEmailSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const CompletedEmail = mongoose.model("CompletedEmail", completedEmailSchema);

export default CompletedEmail;
