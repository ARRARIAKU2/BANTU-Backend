import mongoose from "mongoose";
import { IUser, UserModels } from "../interfaces/interface";

class UserModel implements UserModels {
  private user;
  private dbUser;

  constructor() {
    // Define the schema for the user model
    this.user = new mongoose.Schema({
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        unique: true,
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

    // Check if the model already exists to avoid overwriting it
    this.dbUser = mongoose.models.users || mongoose.model("users", this.user);
  }

  async getUsers() {
    try {
      const response = await this.dbUser.find();
      return response;
    } catch (error) {
      return error;
    }
  }

  async getUser(id: string) {
    try {
      const response = await this.dbUser.findById(id);
      return response;
    } catch (error) {
      return error;
    }
  }

  async createUser(data: IUser) {
    const user = new this.dbUser(data);
    try {
      const response = await user.save();
      return response;
    } catch (error) {
      return error;
    }
  }

  async updateUser(id: string, data: IUser) {
    try {
      const response = await this.dbUser.updateOne({ _id: id }, { $set: data });
      return response;
    } catch (error) {
      return error;
    }
  }

  async deleteUser(id: string) {
    try {
      const response = await this.dbUser.deleteOne({ _id: id });
      return response;
    } catch (error) {
      return error;
    }
  }

  async checkEmail(email: string) {
    try {
      const response = await this.dbUser.findOne({ email: email });
      return response;
    } catch (error) {
      return error;
    }
  }
}

export default new UserModel();
