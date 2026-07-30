import { Request, Response } from "express";
import roleService from "./role.service";

class RoleController {

    async create(req: Request, res: Response) {

        try {

            const role = await roleService.createRole(req.body);

            return res.status(201).json({
                success: true,
                message: "Role created successfully.",
                data: role
            });

        } catch (error: any) {

            return res.status(400).json({
                success: false,
                message: error.message
            });

        }

    }

    async getAll(req: Request, res: Response) {

        const roles = await roleService.getRoles();

        return res.json({
            success: true,
            data: roles
        });

    }

    async getById(req: Request, res: Response) {

        try {

            const role = await roleService.getRole(Number(req.params.id));

            return res.json({
                success: true,
                data: role
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

            const role = await roleService.updateRole(
                Number(req.params.id),
                req.body
            );

            return res.json({
                success: true,
                message: "Role updated successfully.",
                data: role
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

            await roleService.deleteRole(Number(req.params.id));

            return res.json({
                success: true,
                message: "Role deleted successfully."
            });

        } catch (error: any) {

            return res.status(400).json({
                success: false,
                message: error.message
            });

        }

    }
    async assignPermissions(req:Request,res:Response){

    try{

        const permissions =
            await roleService.assignPermissions(

                Number(req.params.roleId),

                req.body.permission_ids

            );

        return res.json({

            success:true,

            message:"Permissions assigned successfully.",

            data:permissions

        });

    }catch(error:any){

        return res.status(400).json({

            success:false,

            message:error.message

        });

    }

}
async getPermissions(req:Request,res:Response){

    const permissions=

    await roleService.getPermissions(

        Number(req.params.roleId)

    );

    return res.json({

        success:true,

        data:permissions

    });

}
async removePermission(req:Request,res:Response){

    await roleService.removePermission(

        Number(req.params.roleId),

        Number(req.params.permissionId)

    );

    return res.json({

        success:true,

        message:"Permission removed."

    });

}
}

export default new RoleController();