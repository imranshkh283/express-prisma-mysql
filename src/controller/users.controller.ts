import bcrypt from "bcryptjs";
import prisma from "../client";
import { userService } from "../services";
import { NextFunction, Request, Response } from "express";

const insertUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, name } = req.body;
  const password = await bcrypt.hash(req.body.password, 8);
  const user = await userService.createUser({ name, email, password });
  return res.status(200).json({ message: "user create", data: user });
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    return res.status(200).json({
      message: "Success",
      users,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
    });
  }
};

const updateUsers = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const updated = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        name: String(name),
        email: String(email),
      },
    });
    res.json({ message: "update", data: updated });
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.user.delete({
    where: {
      id: Number(id),
    },
  });
  res.json({ message: "delete" });
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const getPass = await prisma.user.findUnique({
      where: {
        email: String(email),
      },
      select: {
        email: true,
        password: true,
      },
    });
    if (getPass?.password) {
      const valid = await bcrypt.compare(password, getPass.password as string);
      if (!valid) {
        return res.json("Incorrect email or password");
      } else {
        return res.json("Success");
      }
    }
  } catch (error) {}
};

export default {
  insertUser,
  getAllUsers,
  updateUsers,
  deleteUser,
  login,
};
