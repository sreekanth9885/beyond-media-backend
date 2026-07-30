import { Request, Response } from "express";
import userService from "./user.service";

class UserController {
  async create(req: Request, res: Response) {
    try {
      const user = await userService.createUser(req.body);

      return res.status(201).json({
        success: true,
        message: "User created successfully.",
        data: user,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const users = await userService.getUsers();

      return res.json({
        success: true,
        data: users,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const user = await userService.getUser(Number(req.params.id));

      return res.json({
        success: true,
        data: user,
      });
    } catch (error: any) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const user = await userService.updateUser(
        Number(req.params.id),
        req.body,
      );

      return res.json({
        success: true,
        message: "User updated successfully.",
        data: user,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await userService.deleteUser(Number(req.params.id));

      return res.json({
        success: true,
        message: "User deleted successfully.",
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new UserController();
