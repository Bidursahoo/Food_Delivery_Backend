import express, { Request, Response, NextFunction } from "express";
import { VendorLogin } from "../controllers";
const router = express.Router();

router.post("/login", VendorLogin);

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    message: "Vendor Route Hello",
  });
});
export { router as VendorRoute };
