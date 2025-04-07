import express from "express";
import {
  getAllProducts,
  createProduct,
  deleteProduct,
  getSingleProduct,
  updateProduct,
  uploadImage,
} from "../controllers/product.controller.js";
import {
  authenticateUser,
  authorizePermisission,
} from "../middlewares/authentication.js";
const router = express.Router();

router.post(
  "/",
  [authenticateUser, authorizePermisission("admin")],
  createProduct
);
router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);
router.post(
    "/uploadImage",
    [authenticateUser, authorizePermisission("admin")],
    uploadImage
  );
router.patch(
  "/:id",
  [authenticateUser, authorizePermisission("admin")],
  updateProduct
);
router.delete(
  "/:id",
  [authenticateUser, authorizePermisission("admin")],
  deleteProduct
);


export default router;
