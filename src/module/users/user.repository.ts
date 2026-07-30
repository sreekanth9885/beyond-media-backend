import db from "../../config/db";

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  role_ids?: number[];
}

export interface UpdateUserDto {
  name: string;
  email: string;
  role_ids?: number[];
}

class UserRepository {
  async findByEmail(email: string, excludeId?: number) {

    let query = `
        SELECT *
        FROM users
        WHERE email = ?
    `;

    const params: any[] = [email];

    if (excludeId) {
        query += " AND id != ?";
        params.push(excludeId);
    }

    query += " LIMIT 1";

    const [rows]: any = await db.execute(query, params);

    return rows[0] || null;
}

  async findById(id: number) {
    const [rows]: any = await db.execute(
      `SELECT
                id,
                name,
                email,
                created_at
            FROM users
            WHERE id = ?`,
      [id],
    );

    return rows[0] || null;
  }

  async findAll() {
    const [rows]: any = await db.execute(
      `SELECT
                u.id,
                u.name,
                u.email,
                u.created_at,
                GROUP_CONCAT(
                    DISTINCT r.name
                    ORDER BY r.name
                    SEPARATOR ', '
                ) AS roles
            FROM users u
            LEFT JOIN user_roles ur
                ON ur.user_id = u.id
            LEFT JOIN roles r
                ON r.id = ur.role_id
            GROUP BY u.id
            ORDER BY u.id DESC`,
    );

    return rows;
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
                ON ur.role_id = r.id
            WHERE ur.user_id = ?
            ORDER BY r.name`,

      [userId],
    );

    return rows;
  }

  async create(data: CreateUserDto) {
    const connection = await db.getConnection();

    try {
      await connection.beginTransaction();

      // Validate Role IDs
      if (data.role_ids && data.role_ids.length > 0) {
        const placeholders = data.role_ids.map(() => "?").join(",");

        const [roles]: any = await connection.execute(
          `SELECT id
                    FROM roles
                    WHERE id IN (${placeholders})`,

          data.role_ids,
        );

        if (roles.length !== data.role_ids.length) {
          throw new Error("One or more role IDs are invalid.");
        }
      }

      // Create User
      const [result]: any = await connection.execute(
        `INSERT INTO users
                (name,email,password)
                VALUES(?,?,?)`,

        [data.name, data.email, data.password],
      );

      const userId = result.insertId;

      // Assign Roles
      if (data.role_ids && data.role_ids.length > 0) {
        for (const roleId of data.role_ids) {
          await connection.execute(
            `INSERT INTO user_roles
                        (user_id,role_id)
                        VALUES(?,?)`,

            [userId, roleId],
          );
        }
      }

      await connection.commit();

      return userId;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  async update(id: number, data: UpdateUserDto) {
    const connection = await db.getConnection();

    try {
      await connection.beginTransaction();

      if (data.role_ids && data.role_ids.length > 0) {
        const placeholders = data.role_ids.map(() => "?").join(",");

        const [roles]: any = await connection.execute(
          `SELECT id
                    FROM roles
                    WHERE id IN (${placeholders})`,

          data.role_ids,
        );

        if (roles.length !== data.role_ids.length) {
          throw new Error("One or more role IDs are invalid.");
        }
      }

      await connection.execute(
        `UPDATE users
                SET
                    name = ?,
                    email = ?
                WHERE id = ?`,

        [data.name, data.email, id],
      );

      await connection.execute(
        `DELETE FROM user_roles
                WHERE user_id = ?`,

        [id],
      );

      if (data.role_ids && data.role_ids.length > 0) {
        for (const roleId of data.role_ids) {
          await connection.execute(
            `INSERT INTO user_roles
                        (user_id,role_id)
                        VALUES(?,?)`,

            [id, roleId],
          );
        }
      }

      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  async delete(id: number) {
    await db.execute(
      `DELETE FROM users
            WHERE id = ?`,

      [id],
    );
  }
}

export default new UserRepository();
