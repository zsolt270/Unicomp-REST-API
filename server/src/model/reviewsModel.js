import mongoose from "mongoose";

const ReviewsSchema = new mongoose.Schema(
  {
    uid: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    bookid: { type: mongoose.Schema.Types.ObjectId, ref: "Books" },
    rating: { type: String, required: "The rating is required!" },
    reviewtext: { type: String, required: "The review text is required!" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Reviews", ReviewsSchema);
