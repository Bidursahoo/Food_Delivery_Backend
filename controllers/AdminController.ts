import { Request, Response, NextFunction } from "express";
import { CreateVendorInput } from "../dto";
import { Vendor } from "../models";

export const CreateVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    name,
    ownerName,
    foodType,
    pinCode,
    address,
    phone,
    email,
    password,
  } = <CreateVendorInput>req.body;

  const createdVendor = await Vendor.create({
    name,
    ownerName,
    foodType,
    pinCode,
    address,
    phone,
    email,
    password,
  });
  res.status(200).json({
    result: {
      name,
      ownerName,
      foodType,
      pinCode,
      address,
      phone,
      email,
      password,
    },
  });
};

export const GetAllVendors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json({
    message: "Admin Route To Get All Vendors",
  });
};

export const GetVendorId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json({
    message: "Admin Route To Get Vendor By Id",
  });
};
