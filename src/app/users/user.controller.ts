import { Request, Response } from "express";
import { createUserSchema, signinUserSchema } from "./user.schema";
import User from "./user.entity";
import errorResponse from "../../helpers/response";
import { StatusCodes } from "http-status-codes";
import { signJwt } from "../../helpers/jwt";
import logger from "../../helpers/logger";
import bcrypt from "bcrypt";

declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

export default class UserController {
  static async SignUp(req: Request, res: Response) {
    const { email, username, password } = req.body;

    const { error } = createUserSchema.validate(req.body);

    if (error) {
      return res.sendStatus(StatusCodes.BAD_REQUEST).json(error.details);
    }

    try {
      const userExist = await User.findOne({
        where: { email: email.toLowerCase() },
      });
      if (userExist) {
        return errorResponse(res, "Email already in use", StatusCodes.CONFLICT);
      }
      const newUser = User.create();

      newUser.email = email.toLowerCase();
      newUser.username = username;
      newUser.password = password;

      await User.save(newUser);

      const access_token = signJwt(
        {
          userId: newUser.id.toString(),
        },
        {
          expiresIn: "30d",
        }
      );

      return res.status(StatusCodes.CREATED).json({
        newUser,
        access_token,
      });
    } catch (err) {
      logger.error(err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  static async SignIn(req: Request, res: Response) {
    const { error } = signinUserSchema.validate(req.body); 
    const errorMessage = "Invalid Credentials!";

    if (error) {
      return res.json(error.details);
    }

    const { email = "", password = "" } = req.body;
    try {
      const user = await User.findOne({
        where: { email: email.toLowerCase() },
        select: ["email", "username", "id", "password", "admin"],
      });

      const isPasswordValid = await bcrypt.compare(
        password,
        user?.password ?? ""
      );

      if (!user || !isPasswordValid) {
        return errorResponse(res, errorMessage, StatusCodes.UNAUTHORIZED);
      }

      const access_token = signJwt(
        {
          userId: user.id.toString(),
        },
        {
          expiresIn: "30d",
        }
      );

      const { password: pass, ...resUser } = user;

      return res.status(StatusCodes.OK).json({
        user: resUser,
        access_token,
      });
    } catch (err) {
      logger.error(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  static async currentUser(req: Request, res: Response) {
    const { currentUser } = req;

    if (!currentUser) {
      return res.sendStatus(401);
    }

    return res.json(currentUser);
  }
}
