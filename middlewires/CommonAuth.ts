import { Request } from "express";
import { AuthPayload } from "../dto/Auth.dto";
declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}
