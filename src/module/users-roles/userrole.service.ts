import userroleRepository from "./userrole.repository";
class UserRoleService {

    async assignRoles(userId:number, roleIds:number[]){

        await userroleRepository.assignRoles(
            userId,
            roleIds
        );

        return await userroleRepository.getRoles(userId);

    }

    async getRoles(userId:number){

        return await userroleRepository.getRoles(userId);

    }

    async removeRole(
        userId:number,
        roleId:number
    ){

        await userroleRepository.removeRole(
            userId,
            roleId
        );

    }

}

export default new UserRoleService();