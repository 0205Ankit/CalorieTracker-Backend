import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const isAdminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.currentUser;

  if (!user?.admin) return res.status(StatusCodes.FORBIDDEN).send("Permission Denied");

  next();
};

export default isAdminMiddleware;
