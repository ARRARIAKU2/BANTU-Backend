import mongoose from "mongoose";
import { IBookings, BookingsModels } from "../interfaces/interface";

class BookingsModel implements BookingsModels {
  private booking;
  private dbBooking;

  constructor() {
    // Define the schema for the user model
    this.booking = new mongoose.Schema({
      user_id: {
        type: String,
        required: true,
      },
      service_id: {
        type: String,
        required: true,
      },
      schedule: {
        type: Date,
        required: true,
      },
      notes: {
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
    this.dbBooking =
      mongoose.models.bookings || mongoose.model("bookings", this.booking);
  }

  async getBookings() {
    try {
      const response = await this.dbBooking.find();
      return response;
    } catch (error) {
      return error;
    }
  }

  async getBooking(id: string) {
    try {
      const response = await this.dbBooking.findById(id);
      return response;
    } catch (error) {
      return error;
    }
  }

  async getBookingByUserId(userId: string) {
    try {
      const response = await this.dbBooking.find({ user_id: userId });
      return response;
    } catch (error) {
      return error;
    }
  }

  async createBookings(data: IBookings) {
    const booking = new this.dbBooking(data);
    try {
      const response = await booking.save();
      return response;
    } catch (error) {
      return error;
    }
  }

  async updateBookings(id: string, data: IBookings) {
    try {
      const response = await this.dbBooking.updateOne(
        { _id: id },
        { $set: data }
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  async deleteBookings(id: string) {
    try {
      const response = await this.dbBooking.deleteOne({ _id: id });
      return response;
    } catch (error) {
      return error;
    }
  }
}

export default new BookingsModel();
