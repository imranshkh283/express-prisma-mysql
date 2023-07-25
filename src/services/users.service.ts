import { Prisma } from "@prisma/client";
import prisma from "../client";
import ApiError from "../utils/ApiError";
export const createUser = async (user: Prisma.UserCreateInput) => {
  if (await getUserByEmail(user.email)) {
    throw new ApiError(500, "Email already exists");
  }
  return await prisma.user.create({ data: user });
};

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({ where: { email } });
};

const updateUserById = async (userId: number) => {};

// export const findUser = async (
//   userWhereUniqueInput: Prisma.UserWhereUniqueInput
//   ) => {
//     return await prisma.user.findUnique({ where: userWhereUniqueInput });
// }
