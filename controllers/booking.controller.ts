import { Request, Response } from "express";

import ServiceBookings from "../service/bookings.service";
import ServiceServices from "../service/services.service";
import { IBookings, BookingsControllers } from "../interfaces/interface";

interface AuthenticatedRequest extends Request {
  user?: any; // Adjust the type according to your decoded user type
}

class BookingController implements BookingsControllers {
  constructor() {}

  async getBookings(req: Request, res: Response) {
    try {
      const response = (await ServiceBookings.getBookings()) as IBookings[];

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

  async getBooking(req: Request, res: Response) {
    try {
      const response = (await ServiceBookings.getBooking(
        req.params.id
      )) as IBookings;

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

  async getBookingByUserId(req: Request, res: Response) {
    const userId: string = (req as AuthenticatedRequest).user._id;
    try {
      const response = (await ServiceBookings.getBookingByUserId(
        userId
      )) as IBookings;

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

  async createBookings(req: Request, res: Response) {
    try {
      // Validate if `service_id` is provided
      if (!req.body.service_id) {
        return res.status(400).json({
          message: "Service ID is required",
        });
      }

      // Check if the service exists
      const service = await ServiceServices.getServices(req.body.service_id);
      if (!service) {
        return res.status(404).json({
          message: "Service not found",
        });
      }

      const data: IBookings = {
        user_id: (req as AuthenticatedRequest).user._id,
        ...req.body,
        created_at: new Date(),
        updated_at: new Date(),
      };

      const response = (await ServiceBookings.createBookings(data)) as any;

      return res.status(201).json({
        message: "Success Create Booking",
        data: response,
      });
    } catch (error) {
      return res.status(500).json({
        message: (error as Error).message,
      });
    }
  }

  async updateBookings(req: Request, res: Response) {
    const data: IBookings = {
      ...req.body,
      updated_at: new Date(),
    };
    try {
      const response = (await ServiceBookings.updateBookings(
        req.params.id,
        data
      )) as any;

      return res.status(200).json({
        message: "Success Update Booking",
        data: response,
      });
    } catch (error) {
      return res.status(500).json({
        message: (error as Error).message,
      });
    }
  }

  async deleteBookings(req: Request, res: Response) {
    try {
      const response = (await ServiceBookings.deleteBookings(
        req.params.id
      )) as any;

      return response.deletedCount === 1
        ? res.status(200).json({
            message: "Success Delete Booking",
            data: response,
          })
        : res.status(404).json({
            message: "Booking not found",
            data: response,
          });
    } catch (error) {
      return res.status(500).json({
        message: (error as Error).message,
      });
    }
  }
}

export default new BookingController();
