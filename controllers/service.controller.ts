import { Request, Response } from "express";

import ServiceServices from "../service/services.service";
import { IServices, ServicesControllers } from "../interfaces/interface";

class ServicesController implements ServicesControllers {
  constructor() {}

  async getAllServices(req: Request, res: Response) {
    const query = {
      category:
        typeof req.query.category === "string"
          ? req.query.category === ""
            ? []
            : req.query.category.split(",")
          : [],
      location:
        typeof req.query.location === "string"
          ? req.query.location === ""
            ? []
            : req.query.location.split(",")
          : [],
      rating:
        typeof req.query.rating === "string"
          ? req.query.rating === ""
            ? []
            : req.query.rating.split(",").map((rating) => Number(rating.trim()))
          : [],
    };
    try {
      const response = (await ServiceServices.getAllServices(
        query
      )) as IServices[];

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

  async getServices(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const response = (await ServiceServices.getServices(id)) as IServices;

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

  async createServices(req: Request, res: Response) {
    try {
      const data: IServices = {
        ...req.body,
        created_at: new Date(),
        updated_at: new Date(),
      };

      const response = (await ServiceServices.createServices(data)) as any;

      return res.status(201).json({
        message: "Success Create Service",
        data: response,
      });
    } catch (error) {
      return res.status(500).json({
        message: (error as Error).message,
      });
    }
  }

  async updateServices(req: Request, res: Response) {
    const id = req.params.id;
    const data: IServices = { ...req.body, updated_at: new Date() };
    try {
      const response = (await ServiceServices.updateServices(id, data)) as any;

      return res.status(200).json({
        message: "Success Update Service",
        data: response,
      });
    } catch (error) {
      return res.status(500).json({
        message: (error as Error).message,
      });
    }
  }

  async deleteServices(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const response = (await ServiceServices.deleteServices(id)) as any;

      return response.deletedCount === 1
        ? res.status(200).json({
            message: "Service deleted",
            data: response,
          })
        : res.status(404).json({
            message: "Service not found",
            data: response,
          });
    } catch (error) {
      return res.status(500).json({
        message: (error as Error).message,
      });
    }
  }
}

export default new ServicesController();
