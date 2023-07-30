import { Prisma, user } from "@prisma/client";
import prisma from "../client";
import ApiError from "../utils/ApiError";

export const createUser = async (user: Prisma.userCreateInput) => {
  if (await getUserByEmail(user.email)) {
    throw new ApiError(500, "Email already exists");
  }
  return await prisma.user.create({ data: user });
};

export const getuserById = async <Key extends keyof user>(
  id: number,
  Keys: Key[]
) => {
  return await prisma.user.findUnique({
    where: { id },
    select: Keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
  });
};

export const updateUserById = async <Key extends keyof user>(
  userId: number,
  updateBody: Prisma.userUpdateInput,
  Keys: Key[] = ["id", "email", "name"] as Key[]
) => {
  const user = await getuserById(userId, ["id", "email", "name"]);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: updateBody,
    select: Keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
  });
  return updatedUser as Pick<user, Key> | null;
};

export const getUserByEmail = async <Key extends keyof user>(
  email: string,
  keys: Key[] = ["id", "email", "name", "password"] as Key[]
) => {
  return await prisma.user.findUnique({ where: { email } });
};

export const deleteUserById = async (userId: number) => {
  const checkUser = await getuserById(userId, ["id"]);
  if (!checkUser) {
    throw new ApiError(404, "User not found");
  }
  const deleteUser = await prisma.user.delete({
    where: { id: userId },
  });
};

// export const getUserByEmail = async (
//   userWhereUniqueInput: Prisma.UserWhereUniqueInput
//   ) => {
//     return await prisma.user.findUnique({ where: userWhereUniqueInput });
// }
