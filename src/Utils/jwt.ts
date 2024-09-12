import { decode, sign } from "jsonwebtoken";

export const genToken = (payload: { id: string }) => {
  return sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
};

export const decodeJwtToken = (token: string) => {
  try {
    return decode(token, { json: true });
  } catch (error) {
    throw error?.message;
  }
};
