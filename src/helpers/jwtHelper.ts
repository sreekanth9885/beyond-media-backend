import jwt, { Secret, SignOptions } from "jsonwebtoken";

const ACCESS_SECRET: Secret = process.env.JWT_ACCESS_SECRET!;
const REFRESH_SECRET: Secret = process.env.JWT_REFRESH_SECRET!;

export interface JwtPayload {
  id: number;
  name: string;
  email: string;
  roles: string[];
  permissions: string[];
}

const accessOptions: SignOptions = {
  expiresIn: "15m",
};

const refreshOptions: SignOptions = {
  expiresIn: "7d",
};

export const generateAccessToken = (user: JwtPayload): string => {
  return jwt.sign(user, ACCESS_SECRET, accessOptions);
};

export const generateRefreshToken = (user: JwtPayload): string => {
  return jwt.sign(user, REFRESH_SECRET, refreshOptions);
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, ACCESS_SECRET);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, REFRESH_SECRET);
};