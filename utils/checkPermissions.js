import CustomError from "../errors/index.js";

const checkPermissions = (requestUser, resourceUserId) => {
  // console.log(resourceUserId.toString());

  if (requestUser.role === "admin") return;
  if (requestUser.userId === resourceUserId.toString()) return;
  throw new CustomError.UnauthorizedError(
    "Not authorized to access this route"
  );
};

export default checkPermissions;
