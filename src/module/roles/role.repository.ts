import db from "../../config/db";

export interface CreateRoleDto {
    name: string;
    description?: string;
    status?: "active" | "inactive";
    created_by?: number;
}

class RoleRepository {

    async create(data: CreateRoleDto) {
        const [result]: any = await db.execute(
            `INSERT INTO roles
            (name, description, status, created_by)
            VALUES (?, ?, ?, ?)`,
            [
                data.name,
                data.description ?? null,
                data.status ?? "active",
                data.created_by ?? null
            ]
        );

        return result.insertId;
    }

    async findByName(name: string) {
        const [rows]: any = await db.execute(
            `SELECT * FROM roles WHERE name = ? LIMIT 1`,
            [name]
        );

        return rows[0] || null;
    }

    async findAll() {
        const [rows]: any = await db.execute(
            `SELECT * FROM roles ORDER BY id DESC`
        );

        return rows;
    }

    async findById(id: number) {
        const [rows]: any = await db.execute(
            `SELECT * FROM roles WHERE id=?`,
            [id]
        );

        return rows[0] || null;
    }

    async update(id: number, data: CreateRoleDto) {

        await db.execute(
            `UPDATE roles
            SET
                name=?,
                description=?,
                status=?
            WHERE id=?`,
            [
                data.name,
                data.description ?? null,
                data.status ?? "active",
                id
            ]
        );
    }

    async delete(id: number) {
        await db.execute(
            `DELETE FROM roles WHERE id=?`,
            [id]
        );
    }
    async assignPermissions(roleId: number, permissionIds: number[]) {

    const connection = await db.getConnection();

    try {

        await connection.beginTransaction();

        await connection.execute(
            `DELETE FROM role_permissions WHERE role_id=?`,
            [roleId]
        );

        for (const permissionId of permissionIds) {

            await connection.execute(
                `INSERT INTO role_permissions
                (role_id,permission_id)
                VALUES (?,?)`,
                [roleId, permissionId]
            );

        }

        await connection.commit();

    } catch (error) {

        await connection.rollback();

        throw error;

    } finally {

        connection.release();

    }

}
async getPermissions(roleId: number) {

    const [rows]: any = await db.execute(

        `SELECT
            p.id,
            p.name,
            p.module,
            p.description
        FROM permissions p
        INNER JOIN role_permissions rp
            ON rp.permission_id=p.id
        WHERE rp.role_id=?
        ORDER BY p.module,p.name`,

        [roleId]

    );

    return rows;

}
async removePermission(roleId: number, permissionId: number) {

    await db.execute(

        `DELETE FROM role_permissions
        WHERE role_id=?
        AND permission_id=?`,

        [roleId, permissionId]

    );

}
}

export default new RoleRepository();