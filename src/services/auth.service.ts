import { Prisma, user } from "@prisma/client";
import prisma from "../client";
import ApiError from "../utils/ApiError";
import { userService } from "./";

export const loginUserWithEmailAndPassword = (
  email: string,
  password: string
) => {
  return [email, password];
};
