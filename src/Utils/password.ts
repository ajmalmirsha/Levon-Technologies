import { compare } from "bcrypt";

export const compareHash = (password: string, hash: string) => {
  try {
    return compare(password, hash);
  } catch (error) {
    console.log(error);
  }
};
