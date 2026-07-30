import { Request, Response } from "express";
import userroleService from "./userrole.service";

class UserRoleController {

    async assignRoles(req:Request,res:Response){

        try{

            const roles=

            await userroleService.assignRoles(

                Number(req.params.userId),

                req.body.role_ids

            );

            return res.json({

                success:true,

                message:"Roles assigned successfully.",

                data:roles

            });

        }catch(error:any){

            return res.status(400).json({

                success:false,

                message:error.message

            });

        }

    }

    async getRoles(req:Request,res:Response){

        const roles=

        await userroleService.getRoles(

            Number(req.params.userId)

        );

        return res.json({

            success:true,

            data:roles

        });

    }

    async removeRole(req:Request,res:Response){

        await userroleService.removeRole(

            Number(req.params.userId),

            Number(req.params.roleId)

        );

        return res.json({

            success:true,

            message:"Role removed."

        });

    }

}

export default new UserRoleController();