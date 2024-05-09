import express, { Request, Response, NextFunction } from "express";
import {
  GetVendorProfile,
  UpdateVendorProfile,
  UpdateVendorService,
  VendorLogin,
} from "../controllers";
const router = express.Router();

router.post("/login", VendorLogin);
router.get("/profile", GetVendorProfile);
router.patch("/profileUpdate", UpdateVendorProfile);
router.patch("/serviceUpdate", UpdateVendorService);

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    message: "Vendor Route Hello",
  });
});
export { router as VendorRoute };
