import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../Utils/response";
import { genToken } from "../Utils/jwt";
import { userModel } from "../Model/user";
import { UserType } from "../Types/User";

type userSchemaType = UserType & {
  comparePassword(password: string): Promise<boolean>;
  _id: string;
};

export const Login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username) throw "username is required !";
    if (!password) throw "password is required !";

    const user: userSchemaType = await userModel
      .findOne({ username })
      .select("username password");

    if (!user) throw "invalid username !";

    if (!(await user?.comparePassword(password))) throw "invalid password !";

    const token = genToken({ id: JSON.stringify(user?._id) });

    SuccessResponse(res, { token }, "user login successful");
  } catch (error) {
    console.log(error);
    ErrorResponse(res, error, "failed login user !");
  }
};

export const Register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username) throw "username is required !";
    if (!password) throw "password is required !";

    const result = await userModel.create({ username, password });

    const token = genToken({ id: JSON.stringify(result?._id) });

    SuccessResponse(res, { token }, "user register successful");
  } catch (error) {
    console.log(error);
    if (error?.errorResponse?.code === 11000)
      ErrorResponse(res, error?.message, "user already exist !", 401);
    ErrorResponse(res, error, "failed register user !", 401);
  }
};
