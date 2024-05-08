import { Request, Response, NextFunction } from "express";
import { VendorLoginInput } from "../dto";
import { findVendor } from "./AdminController";
import { ValidatePassword } from "../utilities";

export const VendorLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const {email, password} = req.body;
  const { email, password } = <VendorLoginInput>req.body;
  const existingVendor = await findVendor(undefined, email);
  if (existingVendor !== null) {
    const validation = await ValidatePassword(
      password,
      existingVendor.password,
      existingVendor.salt
    );
    if (validation) {
      return res.status(200).json({ result: existingVendor });
    } else {
      return res
        .status(400)
        .json({ message: "Email or password is incorrect" });
    }
  }
  return res.status(400).json({ message: "Email or password is incorrect" });
};
