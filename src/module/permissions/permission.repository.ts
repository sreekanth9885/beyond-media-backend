import db from "../../config/db";

export interface CreatePermissionDto {
    name: string;
    module: string;
    description?: string;
}

class PermissionRepository {

    async create(data: CreatePermissionDto) {
        const [result]: any = await db.execute(
            `INSERT INTO permissions
            (name,module,description)
            VALUES(?,?,?)`,
            [
                data.name,
                data.module,
                data.description ?? null
            ]
        );

        return result.insertId;
    }

    async findByName(name: string) {
        const [rows]: any = await db.execute(
            `SELECT * FROM permissions
            WHERE name=? LIMIT 1`,
            [name]
        );

        return rows[0] || null;
    }

    async findAll() {
        const [rows]: any = await db.execute(
            `SELECT * FROM permissions
            ORDER BY module,name`
        );

        return rows;
    }

    async findById(id: number) {
        const [rows]: any = await db.execute(
            `SELECT * FROM permissions
            WHERE id=?`,
            [id]
        );

        return rows[0] || null;
    }

    async update(id: number, data: CreatePermissionDto) {

        await db.execute(
            `UPDATE permissions
            SET
                name=?,
                module=?,
                description=?
            WHERE id=?`,
            [
                data.name,
                data.module,
                data.description ?? null,
                id
            ]
        );

    }

    async delete(id: number) {

        await db.execute(
            `DELETE FROM permissions
            WHERE id=?`,
            [id]
        );

    }

}

export default new PermissionRepository();