import Services from "../models/services.model";
import { IServices, ServicesServices } from "../interfaces/interface";

class ServicesService implements ServicesServices {
  constructor() {}

  async getAllServices(query: any) {
    try {
      const response = await Services.getAllServices(query);
      return response;
    } catch (error) {
      return error;
    }
  }

  async getServices(id: string) {
    try {
      const response = await Services.getServices(id);
      return response;
    } catch (error) {
      return error;
    }
  }

  async createServices(data: IServices) {
    try {
      const response = await Services.createServices(data);
      return response;
    } catch (error) {
      return error;
    }
  }

  async updateServices(id: string, data: IServices) {
    try {
      const response = await Services.updateServices(id, data);
      return response;
    } catch (error) {
      return error;
    }
  }

  async deleteServices(id: string) {
    try {
      const response = await Services.deleteServices(id);
      return response;
    } catch (error) {
      return error;
    }
  }
}

export default new ServicesService();
