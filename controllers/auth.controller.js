import User from "../models/user.model.js";
import { StatusCodes } from "http-status-codes";
import CustomError from "../errors/index.js";
import {
  createJWT,
  isTokenValid,
  attachCookieToResponse,
} from "../utils/jwt.js";

const register = async (req, res) => {
  const { email, name, password } = req.body;
  const emailAreadyExists = await User.findOne({
    email: email,
  });
  if (emailAreadyExists) {
    throw new CustomError.BadRequestError("Email already exists");
  }

  const isFirstUser = (await User.countDocuments({})) === 0;
  const role = isFirstUser ? "admin" : "user";

  const user = await User.create({ name, email, password, role });
  const tokenUser = { name: user.name, id: user._id, role: user.role };

  attachCookieToResponse(res, tokenUser);

  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError.BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.UnauthenticatedError(
      "Please provide valid email and password"
    );
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError(
      "Please provide valid email and password"
    );
  }
  const tokenUser = { name: user.name, id: user._id, role: user.role };
  attachCookieToResponse(res, tokenUser);
  res.status(StatusCodes.OK).json({ user });
};
const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
    secure: process.env.NODE_ENV === "production",
  });
  res.status(StatusCodes.OK).json({ msg: "User logged out!" });
};

export { register, login, logout };
