import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema(
  {
    username: { type: String, required: "Username is required!" },
    email: { type: String, required: "Email address is required!" },
    password: { type: String, required: "Password is required!" },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reviews" }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Users", UsersSchema);
