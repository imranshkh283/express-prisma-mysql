import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError";
import { isPasswordMatch } from "../utils/encryptions";
import exclude from "../utils/exclude";
import { userService, tokenService } from "./";

export const loginUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  const user = await userService.getUserByEmail(email, ["password"]);
  if (!user || !(await isPasswordMatch(password, user.password as string))) {
    throw new ApiError(500, "Incorrect email or password");
  }
  const users = exclude(user, [
    "name",
    "password",
    "isEmailVerified",
    "status",
  ]);
  const token = jwt.sign({ user }, "secret", { expiresIn: "1h" });
  return [user, token];
};
