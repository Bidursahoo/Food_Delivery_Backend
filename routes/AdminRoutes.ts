import express, { Request, Response, NextFunction } from "express";
import { CreateVendor, GetAllVendors, GetVendorId } from "../controllers";
const router = express.Router();
router.post("/vendor", CreateVendor);
router.get("/vendors", GetAllVendors);
router.get("/vendor/:id", GetVendorId);
router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    message: "Admin Route Hello",
  });
});
export { router as AdminRoute };
