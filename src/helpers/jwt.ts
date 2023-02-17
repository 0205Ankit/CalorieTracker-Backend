import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({}); ///????

export const signJwt = (
  object: Record<string, string>,
  options?: jwt.signOptions | undefined
) => {
  const jwtSecret: string = process.env.JWT_SECRET as string;
  try {
    return jwt.sign(object, jwtSecret, {
      ...(options && options),
      algorithm: "HS256",
    });
  } catch (err) {
    return console.log(err, "err");
  }
};

export const verifyJwt = (token: string) => {
  const jwtSecret: string = process.env.JWT_SECRET as string;
  const userId = jwt.verify(token, jwtSecret) as { userId: string };
  return userId;
};
