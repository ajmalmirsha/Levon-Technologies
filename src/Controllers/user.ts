import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../Utils/response";

export const getProfileData = async (req: Request, res: Response) => {
  try {
    //TODO: add profile logics
    SuccessResponse(res, {}, "profile data fetched successfully");
  } catch (error) {
    console.log(error);
    ErrorResponse(res, error?.message);
  }
};

export const getSettingsData = async (req: Request, res: Response) => {
  try {
    //TODO: add settings logics
    SuccessResponse(res, {}, "settings data fetched successfully");
  } catch (error) {
    console.log(error);
    ErrorResponse(res, error?.message);
  }
};
