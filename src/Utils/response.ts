import { Response } from "express";

export const SuccessResponse = (
  res: Response,
  data: any,
  message = "data fetched successfully",
  status = 200
) => {
  res.status(status).json({ message, data });
};

export const ErrorResponse = (
  res: Response,
  error: any,
  message = "something went wrong",
  status = 500
) => {
  res.status(status).json({ message, error });
};
