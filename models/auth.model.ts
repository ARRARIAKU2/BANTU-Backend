import mongoose from "mongoose";
import { IUser, Login, AuthModels } from "../interfaces/interface";

class AuthModel implements AuthModels {
  private user;
  private dbUser;

  constructor() {
    this.user = new mongoose.Schema({
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      created_at: {
        type: Date,
        required: true,
      },
      updated_at: {
        type: Date,
        required: true,
      },
    });

    this.dbUser = mongoose.models.users || mongoose.model("users", this.user);
  }

  async getLogin(params: Login) {
    try {
      const response = (await this.dbUser.findOne({
        email: params.email,
      })) as IUser;
      return response;
    } catch (error) {
      return "tes";
    }
  }
}

export default new AuthModel();
