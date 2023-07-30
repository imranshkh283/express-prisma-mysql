import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import bcrypt from "bcryptjs";
import prisma from "../client";
import { userService } from "../services";

const insertUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, name } = req.body;
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required(),
  });
  if (schema.validate(req.body).error) {
    res.send(schema.validate(req.body).error?.details);
  }

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
  const userId = Number(req.params.id);
  const user = await userService.updateUserById(userId, req.body);
  res.json(user);
};

const deleteUser = async (req: Request, res: Response) => {
  const Id = Number(req.params.id);
  const del = await userService.deleteUserById(Id);
  res.status(200).json({
    message: "User deleted",
  });
};

export default {
  insertUser,
  getAllUsers,
  updateUsers,
  deleteUser,
};
