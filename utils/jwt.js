import jwt from "jsonwebtoken";

const createJWT = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

const attachCookieToResponse = (res, user) => {
  const token = createJWT(user);
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};

const isTokenValid = (token) => jwt.verify(token, process.env.JWT_SECRET);

export { createJWT, isTokenValid , attachCookieToResponse };
