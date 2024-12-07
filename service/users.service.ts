import User from "../models/users.model";
import { IUser, UserServices } from "../interfaces/interface";

class UserService implements UserServices {
  constructor() {}

  async getUsers() {
    try {
      const response = await User.getUsers();
      return response;
    } catch (error) {
      return error;
    }
  }

  async getUser(id: string) {
    try {
      const response = await User.getUser(id);
      return response;
    } catch (error) {
      return error;
    }
  }

  async createUser(data: IUser) {
    try {
      const response = await User.createUser(data);
      return response;
    } catch (error) {
      return error;
    }
  }

  async updateUser(id: string, data: IUser) {
    try {
      const response = await User.updateUser(id, data);
      return response;
    } catch (error) {
      return error;
    }
  }

  async deleteUser(id: string) {
    try {
      const response = await User.deleteUser(id);
      return response;
    } catch (error) {
      return error;
    }
  }

  async checkEmail(email: string) {
    try {
      const response = await User.checkEmail(email);
      return response;
    } catch (error) {
      return error;
    }
  }
}

export default new UserService();
