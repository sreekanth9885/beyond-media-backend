import roleRepository from "./role.repository";

class RoleService {

    async createRole(data: any) {

        const exists = await roleRepository.findByName(data.name);

        if (exists) {
            throw new Error("Role already exists.");
        }

        const id = await roleRepository.create(data);

        return await roleRepository.findById(id);
    }

    async getRoles() {
        return await roleRepository.findAll();
    }

    async getRole(id: number) {

        const role = await roleRepository.findById(id);

        if (!role) {
            throw new Error("Role not found.");
        }

        return role;
    }

    async updateRole(id: number, data: any) {

        const role = await roleRepository.findById(id);

        if (!role) {
            throw new Error("Role not found.");
        }

        await roleRepository.update(id, data);

        return await roleRepository.findById(id);
    }

    async deleteRole(id: number) {

        const role = await roleRepository.findById(id);

        if (!role) {
            throw new Error("Role not found.");
        }

        await roleRepository.delete(id);
    }
    async assignPermissions(roleId:number, permissionIds:number[]) {

    const role = await roleRepository.findById(roleId);

    if (!role) {
        throw new Error("Role not found.");
    }

    await roleRepository.assignPermissions(
        roleId,
        permissionIds
    );

    return await roleRepository.getPermissions(roleId);

}
async getPermissions(roleId:number){

    return await roleRepository.getPermissions(roleId);

}
async removePermission(
    roleId:number,
    permissionId:number
){

    await roleRepository.removePermission(
        roleId,
        permissionId
    );

}
}

export default new RoleService();