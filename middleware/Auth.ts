import { Response, Request, NextFunction } from "express";
import ServiceAuth from "../service/auth.service";
import { IUser } from "../interfaces/interface";

interface AuthenticatedRequest extends Request {
  user?: IUser; // Adjust the type according to your decoded user type
}

class Authorization {
  constructor() { }

  async Auth(req: Request, res: Response, next: NextFunction) {
    const headers = req.headers;

    if (!headers.authorization) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    };

    const token = headers.authorization;

    const decoded = (await ServiceAuth.verifyToken(token)) as any;

    if (decoded.message === "jwt expired") {
      return res.status(401).json({
        message: "Unauthorized",
      });
    };

    (req as AuthenticatedRequest).user = decoded;
    next();
  };
};

export default new Authorization();
