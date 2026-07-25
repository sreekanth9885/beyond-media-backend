import { Request, Response } from "express";
import { loginUser } from "../services/auth.service";

export const login = async (req: Request, res: Response) => {
  try {
    const result = await loginUser(req.body);

    return res.status(result.status).json(result.body);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};