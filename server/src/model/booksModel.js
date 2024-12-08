import mongoose from "mongoose";

const BooksSchema = new mongoose.Schema(
  {
    title: { type: String, required: "The book title is required" },
    author: { type: String, required: "The author is required" },
    genre: { type: String, required: "The genre is required" },
    description: { type: String, required: "The description is required" },
    avgRating: { type: Number },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reviews" }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Books", BooksSchema);
