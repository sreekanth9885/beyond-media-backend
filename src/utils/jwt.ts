import jwt, { SignOptions } from "jsonwebtoken";

export const generateToken = (id: number): string => {
  const options: SignOptions = {
    expiresIn: "7d",
  };

  return jwt.sign(
    { id },
    process.env.JWT_SECRET as string,
    options
  );
};