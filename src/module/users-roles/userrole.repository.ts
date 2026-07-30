import db from "../../config/db";

class UserRoleRepository {

    async assignRoles(userId: number, roleIds: number[]) {

        const connection = await db.getConnection();

        try {

            await connection.beginTransaction();

            await connection.execute(
                `DELETE FROM user_roles WHERE user_id=?`,
                [userId]
            );

            for (const roleId of roleIds) {

                await connection.execute(
                    `INSERT INTO user_roles
                    (user_id,role_id)
                    VALUES (?,?)`,
                    [userId, roleId]
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

    async getRoles(userId: number) {

        const [rows]: any = await db.execute(

            `SELECT
                r.id,
                r.name,
                r.description,
                r.status
            FROM roles r
            INNER JOIN user_roles ur
                ON ur.role_id=r.id
            WHERE ur.user_id=?`,

            [userId]

        );

        return rows;

    }

    async removeRole(userId:number, roleId:number){

        await db.execute(

            `DELETE FROM user_roles
            WHERE user_id=?
            AND role_id=?`,

            [userId, roleId]

        );

    }

}

export default new UserRoleRepository();