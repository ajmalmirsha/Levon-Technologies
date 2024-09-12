import { genSalt, hash } from "bcrypt";

export const getHash = async (password) => {
  try {
    const salt = await genSalt(10);
    return await hash(password, salt);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
