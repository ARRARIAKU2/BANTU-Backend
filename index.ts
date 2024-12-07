import dotenv from "dotenv";
import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";

import ApiAuth from "./routes/auth.route";
import ApiUsers from "./routes/user.route";
import ApiServices from "./routes/service.route";
import ApiBookings from "./routes/booking.route";

dotenv.config();

const mongooseString = process.env.DATABASE_URL || "";
const PORT = process.env.PORT;

class Server {
  private app: Express;
  private db: any;

  constructor() {
    this.app = express();

    // Mongoose connection inside the constructor
    mongoose.connect(mongooseString).then(() => {
      console.log("Connected to MongoDB");
    });

    this.db = mongoose.connection;

    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Set up API routes
    this.app.use("/api", ApiAuth.routes());
    this.app.use("/api/users", ApiUsers.routes());
    this.app.use("/api/services", ApiServices.routes());
    this.app.use("/api/bookings", ApiBookings.routes());
  }

  run() {
    try {
      this.db.on("error", (error: Error) => {
        console.error("Database connection error:", error);
      });

      this.db.once("connected", () => {
        console.log("Connected to database");
      });

      this.app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      });
    } catch (error) {
      console.error("Unable to connect to the Server:", error);
    }
  }
}

new Server().run();
