import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../Utils/response";
import { decodeJwtToken } from "../Utils/jwt";

export const Authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers?.authorization?.split(" ").pop();
    if (!token) {
      ErrorResponse(
        res,
        "authentication token not found",
        "authentication failed",
        401
      );
    } else {
      const decode = decodeJwtToken(token);

      req.headers.userId = decode.id;
      next();
    }
  } catch (error) {
    console.log(error);
    ErrorResponse(res, error, "Error while decoding token", 401);
  }
};
