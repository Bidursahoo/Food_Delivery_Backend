import { Request, Response, NextFunction } from "express";
import { CreateVendorInput } from "../dto";
import { Vendor } from "../models";
import { GeneratePassword, generateSalt } from "../utilities";

export const findVendor = async (id: string | undefined, email?: string) => {
  if (email) {
    return await Vendor.findOne({ email: email });
  } else {
    return await Vendor.findById(id);
  }
};

export const CreateVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //creating a request
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
  //check if the person already exist or not using unique email
  const existingVendor = await findVendor(undefined, email);

  if (existingVendor !== null) {
    return res
      .status(400)
      .json({ message: "Person Already Exist with same email address" });
  }

  //generate salt and password
  const generatedSalt = await generateSalt();
  const userPassword = await GeneratePassword(password, generatedSalt);

  //craete method running
  const createdVendor = await Vendor.create({
    name,
    ownerName,
    foodType,
    pinCode,
    address,
    phone,
    salt: generatedSalt,
    email,
    password: userPassword,
  });
  res.status(200).json({
    result: {
      createdVendor,
    },
  });
};

export const GetAllVendors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const vendors = await Vendor.find();
  if (vendors !== null) {
    return res.status(200).json({
      result: vendors,
    });
  }
  return res.status(200).json({
    message: "NO Vendors Found",
  });
};

export const GetVendorId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const vendorId = req.params.id;
  const vendor = await findVendor(vendorId);

  if (vendor !== null) {
    return res.status(200).json({
      result: vendor,
    });
  }
  return res.status(200).json({
    message: "No Vendor found By this Id",
  });
};
