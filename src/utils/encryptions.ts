import bcrypt from "bcryptjs";
import { loginUserWithEmailAndPassword } from "../services/auth.service";

export const hashPassword = async (password: string) => {
  const salt = 8;
  //const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const isPasswordMatch = async (
  password: string,
  userPassword: string
) => {
  return bcrypt.compareSync(password, userPassword);
};
