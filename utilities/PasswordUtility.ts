import { AppSecret } from "../configs";
import { VendorPayload } from "../dto";
import { AuthPayload } from "../dto/Auth.dto";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
export const generateSalt = async () => {
  return await bcrypt.genSalt();
};
export const GeneratePassword = async (password: string, salt: string) => {
  return await bcrypt.hash(password, salt);
};

export const ValidatePassword = async (
  givenPassword: string,
  savedPassword: string,
  salt: string
) => {
  return (await GeneratePassword(givenPassword, salt)) === savedPassword;
};

export const GenerateSignature = (payload: VendorPayload) => {
  return jwt.sign(payload, AppSecret, { expiresIn: "1d" });
};
export const ValidateSignature = async (req: Request) => {
  const signature = req.get("Authorization");
  if (signature) {
    const payload = (await jwt.verify(
      signature.split(" ")[1],
      AppSecret
    )) as AuthPayload;
    req.user = payload;
    return true;
  }
  return false;
};
