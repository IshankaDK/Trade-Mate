import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const AuthController = {
  async login(req: Request, res: Response) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        data: null,
        message: "Username and password are required",
        status: 400,
      });
    }

    try {
      const user = await User.findOne({ where: { username } });

      if (!user) {
        return res.status(404).json({
          data: null,
          message: "User not found",
          status: 404,
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({
          data: null,
          message: "Invalid credentials",
          status: 401,
        });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);

      res.status(200).json({
        data: {
          id: user.id,
          username: user.username,
          token,
        },
        message: "User logged in successfully",
        status: 200,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        data: null,
        message: "User login failed due to an internal error.",
        status: 500,
      });
    }
  },
  async register(req: Request, res: Response) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        data: null,
        message: "Username and password are required",
        status: 400,
      });
    }

    try {
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        return res.status(400).json({
          data: null,
          message: "Username already taken",
          status: 400,
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({ username, password: hashedPassword });

      res.status(201).json({
        data: {
          id: user.id,
          username: user.username,
        },
        message: "User created successfully",
        status: 201,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        data: null,
        message: "User creation failed due to an internal error.",
        status: 500,
      });
    }
  },
};

export default AuthController;
