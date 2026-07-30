import { Request, Response } from "express";
import permissionService from "./permission.service";

class PermissionController {

    async create(req: Request, res: Response) {

        try {

            const permission = await permissionService.createPermission(req.body);

            return res.status(201).json({
                success: true,
                message: "Permission created successfully.",
                data: permission
            });

        } catch (error: any) {

            return res.status(400).json({
                success: false,
                message: error.message
            });

        }

    }

    async getAll(req: Request, res: Response) {

        const permissions = await permissionService.getPermissions();

        return res.json({
            success: true,
            data: permissions
        });

    }

    async getById(req: Request, res: Response) {

        try {

            const permission = await permissionService.getPermission(Number(req.params.id));

            return res.json({
                success: true,
                data: permission
            });

        } catch (error: any) {

            return res.status(404).json({
                success: false,
                message: error.message
            });

        }

    }

    async update(req: Request, res: Response) {

        try {

            const permission = await permissionService.updatePermission(
                Number(req.params.id),
                req.body
            );

            return res.json({
                success: true,
                message: "Permission updated successfully.",
                data: permission
            });

        } catch (error: any) {

            return res.status(400).json({
                success: false,
                message: error.message
            });

        }

    }

    async delete(req: Request, res: Response) {

        try {

            await permissionService.deletePermission(Number(req.params.id));

            return res.json({
                success: true,
                message: "Permission deleted successfully."
            });

        } catch (error: any) {

            return res.status(400).json({
                success: false,
                message: error.message
            });

        }

    }

}

export default new PermissionController();