import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { IUser, AuthServices } from "../interfaces/interface";

import Auth from "../models/auth.model";

const JWT_KEY = "BANTU";

class AuthService implements AuthServices {
  constructor() {}

  async getLogin(params: any) {
    try {
      const response = (await Auth.getLogin(params)) as any;

      if (!response) {
        return {
          meesage: "User not found",
          success: false,
        };
      }

      const validatePassword = await bcrypt.compareSync(
        params.password,
        response.password
      );

      if (!validatePassword) {
        return {
          message: "Password not match",
          success: false,
        };
      }

      return {
        success: true,
        data: response,
      };
    } catch (error) {
      return error;
    }
  }

  generateToken(data: IUser) {
    try {
      const token = Jwt.sign(data, JWT_KEY, { expiresIn: 60 * 60 });
      return token;
    } catch (error) {
      return error;
    }
  }

  async verifyToken(token: string) {
    try {
      const decoded = Jwt.verify(token, JWT_KEY);
      return decoded;
    } catch (error) {
      return error;
    }
  }
}

export default new AuthService();
