import User from "../models/user.model.js";
import { StatusCodes } from "http-status-codes";
import CustomError from "../errors/index.js";
import { attachCookieToResponse } from "../utils/jwt.js";

const getAllUsers = async (req, res) => {
  const users = await User.find({ role: "user" }).select("-password");
  res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id : ${req.params.id}`);
  }
  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
  const user = req.user;
  res.status(StatusCodes.OK).json({ user });
};
const updateUser = async (req, res) => {
  res.send("Update user");
};
const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError(
      "Please provide old and new password"
    );
  }
  const user = await User.findById(req.user.userId).select("+password");
  if (!user) {
    throw new CustomError.UnauthenticatedError("Authentication invalid");
  }
  const isPasswordCorrect = await user.comparePassword(oldPassword);
  console.log(isPasswordCorrect);

  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid credentials");
  }
  user.password = newPassword;
  await user.save();
  const tokenUser = { name: user.name, id: user._id, role: user.role };
  attachCookieToResponse(res, tokenUser);
  res.status(StatusCodes.OK).json({ msg: "Password Updated" });
};

export {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
