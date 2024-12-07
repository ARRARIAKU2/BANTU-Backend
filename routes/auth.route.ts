import { Router } from "express";

import ControllerAuth from "../controllers/auth.controller";
import ControllerUser from "../controllers/user.controller";
import Auth from "../middleware/Auth";

class ApiLogin {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  routes() {
    this.router.post("/login", ControllerAuth.getLogin);
    this.router.get("/current-user", Auth.Auth, ControllerUser.getCurrentUser);

    return this.router;
  }
}

export default new ApiLogin();
