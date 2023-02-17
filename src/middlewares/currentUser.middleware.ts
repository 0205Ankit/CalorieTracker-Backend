import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import User from "../app/users/user.entity";
import { verifyJwt } from "../helpers/jwt";


export default async function currentUserMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = (req.headers.authorization || " ").split(" ")[1];

  if (token) {
    try {
      const userId = +verifyJwt(token);
      const user = await User.findOne({ where: { id: userId}  });

      if (!user) {
        return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized");
      }
      req.currentUser = user;
      return next();
    } catch (err) {
      return res.status(StatusCodes.UNAUTHORIZED);
    }
  }
  return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized");
}
