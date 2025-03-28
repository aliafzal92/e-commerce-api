import CustomError from "../errors/index.js";
import { isTokenValid } from "../utils/jwt.js";

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    throw new CustomError.UnauthenticatedError("Authentication failed");
  }
  try {
    const payload = isTokenValid(token);
    req.user = { name: payload.name, userId: payload.id, role: payload.role };
    next();
    
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication failed");
  }
  
};

const authorizePermisission = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            throw new CustomError.UnauthorizedError("Unauthorized to access this route");
        }
        next();
    }

    
}

export  {authenticateUser , authorizePermisission};