import { Request, Response } from "express";
import authService from "./auth.service";

class AuthController {
  async login(req: Request, res: Response) {
    try {
      const result = await authService.login(req.body);

      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(401).json({
        success: false,

        message: error.message,
      });
    }
  }
  async refresh(req: Request, res: Response) {
    try {
      const result = await authService.refresh(req.body.refresh_token);

      return res.json(result);
    } catch (error: any) {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new AuthController();
