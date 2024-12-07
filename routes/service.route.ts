import { Router } from "express";

import ControllerService from "../controllers/service.controller";
import Auth from "../middleware/Auth";

class ApiServices {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  routes() {
    this.router.get("/", Auth.Auth, ControllerService.getAllServices);
    this.router.get("/:id", Auth.Auth, ControllerService.getServices);
    this.router.post("/", Auth.Auth, ControllerService.createServices);
    this.router.put("/:id", Auth.Auth, ControllerService.updateServices);
    this.router.delete("/:id", Auth.Auth, ControllerService.deleteServices);

    return this.router;
  }
}

export default new ApiServices();
