import db from "../../config/db";

class AuthRepository {
  async findByEmail(email: string) {
    const [rows]: any = await db.execute(
      `
            SELECT

                u.id,
                u.name,
                u.email,
                u.password,

                GROUP_CONCAT(
                    DISTINCT r.name
                    ORDER BY r.name
                    SEPARATOR ','
                ) AS roles,

                GROUP_CONCAT(
                    DISTINCT p.name
                    ORDER BY p.name
                    SEPARATOR ','
                ) AS permissions

            FROM users u

            LEFT JOIN user_roles ur
                ON ur.user_id = u.id

            LEFT JOIN roles r
                ON r.id = ur.role_id

            LEFT JOIN role_permissions rp
                ON rp.role_id = r.id

            LEFT JOIN permissions p
                ON p.id = rp.permission_id

            WHERE u.email = ?

            GROUP BY
                u.id,
                u.name,
                u.email,
                u.password

            LIMIT 1
            `,

      [email],
    );

    return rows[0] || null;
  }
}

export default new AuthRepository();
