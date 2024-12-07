import { Request, Response } from "express";

import AuthService from "../service/auth.service";
import { Login, IUser, AuthControllers } from "../interfaces/interface";

class AuthController implements AuthControllers {
  constructor() {}

  async getLogin(req: Request, res: Response) {
    const params: Login = {
      email: req.body.email,
      password: req.body.password,
    };

    // Validation for email and password
    if (!params.email || !params.password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    try {
      const response = (await AuthService.getLogin(params)) as any;

      if (!response.success) {
        return res.status(400).json({
          success: response.success,
        });
      }

      const user: IUser = {
        _id: response.data._id,
        name: response.data.name,
        email: response.data.email,
      };

      const token = AuthService.generateToken(user);
      return res.status(200).json({
        token: token,
      });
    } catch (error) {
      return res.status(500).json({
        message: (error as Error).message,
      });
    }
  }
}

export default new AuthController();
