import { Router } from "express";

import ControllerBooking from "../controllers/booking.controller";
import Auth from "../middleware/Auth";

class ApiBookings {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  routes() {
    this.router.get("/", Auth.Auth, ControllerBooking.getBookings);
    this.router.get("/:id", Auth.Auth, ControllerBooking.getBooking);
    this.router.get(
      "/user/:id",
      Auth.Auth,
      ControllerBooking.getBookingByUserId
    );
    this.router.post("/", Auth.Auth, ControllerBooking.createBookings);
    this.router.put("/:id", Auth.Auth, ControllerBooking.updateBookings);
    this.router.delete("/:id", Auth.Auth, ControllerBooking.deleteBookings);

    return this.router;
  }
}

export default new ApiBookings();
