import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Please provide a rating between 1 and 5"],
    },
    title: {
      type: String,
      required: [true, "Please provide a review title"],
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    comment: {
      type: String,
      required: [true, "Please provide a comment"],
      maxlength: [1000, "Comment cannot be more than 1000 characters"],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

ReviewSchema.index({ product: 1, user: 1 }, { unique: true });
const Review = mongoose.model("Review", ReviewSchema);

export default Review;
