import BadRequestError from "./bad-request.js";
import CustomAPIError from "./custom-api.js";
import NotFoundError from "./not-found.js";
import UnauthenticatedError from "./unauthenticated.js";
import UnauthorizedError from "./unauthorized.js";

const CustomError = {
  BadRequestError,
  CustomAPIError,
  NotFoundError,
  UnauthenticatedError,
  UnauthorizedError,
};

export default CustomError;
