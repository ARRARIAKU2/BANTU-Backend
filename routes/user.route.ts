import { Router } from "express";

import ControllerUser from "../controllers/user.controller";
import Auth from "../middleware/Auth";

class ApiUsers {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  routes() {
    this.router.get("/", Auth.Auth, ControllerUser.getUsers);
    this.router.get("/:id", Auth.Auth, ControllerUser.getUser);
    this.router.post("/", Auth.Auth, ControllerUser.createUser);
    this.router.put("/:id", Auth.Auth, ControllerUser.updateUser);
    this.router.delete("/:id", Auth.Auth, ControllerUser.deleteUser);

    return this.router;
  }
}

export default new ApiUsers();
