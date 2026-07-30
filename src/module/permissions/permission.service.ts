import permissionRepository from "./permission.repository";

class PermissionService {

    async createPermission(data: any) {

        const exists = await permissionRepository.findByName(data.name);

        if (exists) {
            throw new Error("Permission already exists.");
        }

        const id = await permissionRepository.create(data);

        return await permissionRepository.findById(id);
    }

    async getPermissions() {
        return await permissionRepository.findAll();
    }

    async getPermission(id: number) {

        const permission = await permissionRepository.findById(id);

        if (!permission) {
            throw new Error("Permission not found.");
        }

        return permission;
    }

    async updatePermission(id: number, data: any) {

        const permission = await permissionRepository.findById(id);

        if (!permission) {
            throw new Error("Permission not found.");
        }

        await permissionRepository.update(id, data);

        return await permissionRepository.findById(id);
    }

    async deletePermission(id: number) {

        const permission = await permissionRepository.findById(id);

        if (!permission) {
            throw new Error("Permission not found.");
        }

        await permissionRepository.delete(id);
    }

}

export default new PermissionService();