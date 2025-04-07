import express from "express";
import { authenticateUser } from "../middlewares/authentication.js";
import { StatusCodes } from "http-status-codes";

import {
  getAllReviews,
  createReview,
  deleteReview,
  getSingleReview,
  updateReview, 
} from "../controllers/review.controller.js";

const router = express.Router();

router.get("/", getAllReviews);
router.post("/", authenticateUser, createReview);
router.get("/:id", getSingleReview);
router.patch("/:id", updateReview);
router.delete("/:id", deleteReview);

export default router;
