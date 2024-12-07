import mongoose from "mongoose";
import { IServices, ServicesModels } from "../interfaces/interface";

class ServicesModel implements ServicesModels {
  private service;
  private dbService;

  constructor() {
    // Define the schema for the user model
    this.service = new mongoose.Schema({
      name: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
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
    this.dbService =
      mongoose.models.services || mongoose.model("services", this.service);
  }

  async getAllServices(query: IServices) {
    try {
      const response = await this.dbService.find({
        $and: [
          query.category && query.category.length > 0
            ? { category: { $in: query.category } }
            : {}, // If category is empty or not provided, don't filter by category
          query.location && query.location.length > 0
            ? { location: { $in: query.location } }
            : {}, // If location is empty or not provided, don't filter by location
          query.rating && query.rating > 0
            ? { rating: { $in: query.rating } }
            : {}, // If rating is empty or not provided, don't filter by rating
        ],
      });
      return response;
    } catch (error) {
      return error;
    }
  }

  async getServices(id: string) {
    try {
      const response = await this.dbService.findById(id);
      return response;
    } catch (error) {
      return error;
    }
  }

  async createServices(data: IServices) {
    const service = new this.dbService(data);
    try {
      const response = await service.save();
      return response;
    } catch (error) {
      return error;
    }
  }

  async updateServices(id: string, data: IServices) {
    try {
      const response = await this.dbService.updateOne(
        { _id: id },
        { $set: data }
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  async deleteServices(id: string) {
    try {
      const response = await this.dbService.deleteOne({ _id: id });
      return response;
    } catch (error) {
      return error;
    }
  }
}

export default new ServicesModel();
