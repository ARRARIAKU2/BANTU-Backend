import Bookings from "../models/bookings.model";
import { IBookings, BookingsServices } from "../interfaces/interface";

class BookingsService implements BookingsServices {
  constructor() {}

  async getBookings() {
    try {
      const response = await Bookings.getBookings();
      return response;
    } catch (error) {
      return error;
    }
  }

  async getBooking(id: string) {
    try {
      const response = await Bookings.getBooking(id);
      return response;
    } catch (error) {
      return error;
    }
  }

  async getBookingByUserId(userId: string) {
    try {
      const response = await Bookings.getBookingByUserId(userId);
      return response;
    } catch (error) {
      return error;
    }
  }

  async createBookings(data: IBookings) {
    try {
      const response = await Bookings.createBookings(data);
      return response;
    } catch (error) {
      return error;
    }
  }

  async updateBookings(id: string, data: IBookings) {
    try {
      const response = await Bookings.updateBookings(id, data);
      return response;
    } catch (error) {
      return error;
    }
  }

  async deleteBookings(id: string) {
    try {
      const response = await Bookings.deleteBookings(id);
      return response;
    } catch (error) {
      return error;
    }
  }
}

export default new BookingsService();
