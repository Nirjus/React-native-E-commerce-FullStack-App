import jwt from "jsonwebtoken";

export const createJWT = (payload, key, expiresIn) => {
  const token = jwt.sign(payload, key, {
    expiresIn: expiresIn,
  });
  return token;
};
