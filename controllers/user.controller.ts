import { Request, Response } from "express";
import bcrypt from "bcrypt";

import ServiceUsers from "../service/users.service";
import ServiceAuth from "../service/auth.service";
import { IUser, UserControllers } from "../interfaces/interface";

class UserController implements UserControllers {
  constructor() {}
  async getUsers(req: Request, res: Response) {
    try {
      const response = (await ServiceUsers.getUsers()) as IUser[];

      if (response.length === 0) {
        return res.status(404).json({
          message: "No users found",
          data: response,
        });
      }

      return res.status(200).json({
        message: "Success",
        data: response,
      });
    } catch (error) {
      return res.status(500).json({
        message: (error as Error).message,
      });
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const response = (await ServiceUsers.getUser(req.params.id)) as IUser;

      if (!response) {
        return res.status(404).json({
          message: "No data found",
          data: response,
        });
      }

      return res.status(200).json({
        message: "Success",
        data: response,
      });
    } catch (error) {
      return res.status(500).json({
        message: (error as Error).message,
      });
    }
  }

  async getCurrentUser(req: Request, res: Response) {
    try {
      const headers = req.headers;
      const token = headers.authorization as string;
      const decoded = (await ServiceAuth.verifyToken(token)) as IUser;

      return res.status(200).json({
        data: decoded,
      });
    } catch (error) {
      return res.status(500).json({
        message: (error as Error).message,
      });
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      // Validate if the password is less than 8 characters
      if (!req.body.password || req.body.password.length < 8) {
        return res.status(400).json({
          message: "Password must be at least 8 characters long.",
        });
      }

      // Check if the email already exists
      const existingUser = await ServiceUsers.checkEmail(req.body.email);
      if (existingUser) {
        return res.status(400).json({
          message: "Email already exists!",
        });
      }

      const password = await bcrypt.hash(req.body.password, 10);
      const data: IUser = {
        ...req.body,
        password,
        created_at: new Date(),
        updated_at: new Date(),
      };
      const user = (await ServiceUsers.createUser(data)) as IUser;

      return res.status(201).json({
        message: "Success Create Data!",
        data: user,
      });
    } catch (error) {
      return res.status(500).json({
        message: (error as Error).message,
      });
    }
  }

  async updateUser(req: Request, res: Response) {
    const params: IUser = { ...req.body, updated_at: new Date() };
    try {
      const response = (await ServiceUsers.updateUser(
        req.params.id,
        params
      )) as IUser;

      return res.status(200).json({
        message: "Success Update Data!",
        data: response,
      });
    } catch (error) {
      return res.status(500).json({
        message: (error as Error).message,
      });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const response = (await ServiceUsers.deleteUser(req.params.id)) as any;

      return response.deletedCount === 1
        ? res.status(200).json({
            message: "User successfully deleted.",
            data: response,
          })
        : res.status(404).json({
            message: "User not found.",
            data: response,
          });
    } catch (error) {
      return res.status(500).json({
        message: (error as Error).message,
      });
    }
  }
}

export default new UserController();
