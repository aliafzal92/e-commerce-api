import Review from "../models/review.model.js";
import Product from "../models/product.model.js";
import CustomError from "../errors/index.js";
import { StatusCodes } from "http-status-codes";

const createReview = async (req, res) => {
  const { product: productId } = req.body;
  const isValidProduct = await Product.findOne({ _id: productId });

  if (!isValidProduct) {
    throw new CustomError.NotFoundError(
      `No product found with id : ${productId}`
    );
  }

  const alreadyExists = await Review.findOne({
    product: productId,
    user: req.user.userId,
  });
  if (alreadyExists) {
    throw new CustomError.BadRequestError("Review already submitted.");
  }
  if (alreadyExists) {
    throw new CustomError.BadRequestError(
      `You have already reviewed this product`
    );
  }
  req.body.user = req.user.userId;

  const review = await Review.create(req.body);
  res.status(StatusCodes.CREATED).json({
    review,
  });
};

const getAllReviews = async (req, res) => {
  const reviews = await Review.find({});
  if (!reviews) {
    throw new CustomError.NotFoundError("No reviews found");
  }
  
  res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
  
};
const getSingleReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const review = await Review.findOne({ _id: reviewId });
  if (!review) {
    throw new CustomError.NotFoundError(`No review found with id : ${reviewId}`);
  }
  res.status(StatusCodes.OK).json({ review });
};

const updateReview = async (req, res) => {
  res.send("update review");
};
const deleteReview = async (req, res) => {
  res.send("delete review");
};

export {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
