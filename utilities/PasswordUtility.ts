const bcrypt = require("bcrypt");
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
