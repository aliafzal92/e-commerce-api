import CustomError from "../errors/index.js";
import Product from "../models/product.model.js";
import { StatusCodes } from "http-status-codes";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createProduct = async (req, res) => {
  req.body.user = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ products, count: products.length });
};

const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });
  if (!product) {
    throw new CustomError.NotFoundError(`No product with id : ${productId}`);
  }
  res.status(StatusCodes.OK).json({ product });
};

const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });
  if (!product) {
    throw new CustomError.NotFoundError(`No product with id : ${productId}`);
  }
  await product.remove();
  res.status(StatusCodes.OK).json({ msg: "Success! Product removed" });
};

const updateProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true,
  });
  res.send("update product");
};

const uploadImage = async (req, res) => {
  console.log("Inside upload route")
  if (!req.files) {
    throw new CustomError.BadRequestError("No file uploaded");
  }
  const productImage = req.files.image;
  console.log(productImage);
  

  if (!productImage.mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError("Please upload an image");
  }
  const maxSize = 1024*1024; // 1MB  

  if (productImage.size > maxSize) {
    console.log(productImage.size , maxSize);
    
    throw new CustomError.BadRequestError(
      "Please upload image smaller than 1MB"
    );
  }

  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`
  );
  await productImage.mv(imagePath);
  res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` });
};

export {
  createProduct, 
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  uploadImage,
};
