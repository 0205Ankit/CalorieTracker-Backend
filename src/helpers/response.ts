import { Response } from "express";

export default function errorResponse(
  res: Response,
  message: string,
  httpCode = 400
) {
  return res.status(httpCode).json({ message });
}
