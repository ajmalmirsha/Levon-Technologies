import { NextFunction, Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../Utils/response";
import redisClient from "..";

export const checkCache = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { city } = req.params;
    const data = await redisClient.get(city);
console.log("Data", data);

    if (!data) {
      next();
    } else {
      SuccessResponse(res, JSON.parse(data), "data fetched from cache");
    }
  } catch (error) {
    console.log(error?.message);
    ErrorResponse(res, error);
  }
};
