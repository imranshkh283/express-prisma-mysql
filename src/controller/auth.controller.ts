import bcrypt from "bcryptjs";
import prisma from "../client";
import { authService } from "../services";
import { NextFunction, Request, Response } from "express";

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const checkUseremail = await authService.loginUserWithEmailAndPassword(
    email,
    password
  );
  res.send({ checkUseremail });
};
export default { login };
