import bcrypt from "bcrypt";
import db from "../config/db";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../helpers/jwtHelper";

export const loginUser = async (data: any) => {
  const { email, password } = data;

  if (!email || !password) {
    return {
      status: 400,
      body: {
        success: false,
        message: "Email and password are required.",
      },
    };
  }

  const [rows]: any = await db.execute(
    `
        SELECT

            u.id,
            u.name,
            u.email,
            u.password,

            GROUP_CONCAT(
                DISTINCT r.name
                SEPARATOR ','
            ) AS roles,

            GROUP_CONCAT(
                DISTINCT p.name
                SEPARATOR ','
            ) AS permissions

        FROM users u

        LEFT JOIN user_roles ur
            ON ur.user_id=u.id

        LEFT JOIN roles r
            ON r.id=ur.role_id

        LEFT JOIN role_permissions rp
            ON rp.role_id=r.id

        LEFT JOIN permissions p
            ON p.id=rp.permission_id

        WHERE u.email=?

        GROUP BY u.id
        `,

    [email],
  );

  if (rows.length === 0) {
    return {
      status: 401,
      body: {
        success: false,
        message: "Invalid email or password.",
      },
    };
  }

  const user = rows[0];

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return {
      status: 401,
      body: {
        success: false,
        message: "Invalid email or password.",
      },
    };
  }

  const roles = user.roles ? user.roles.split(",") : [];

  const permissions = user.permissions ? user.permissions.split(",") : [];

  const payload = {
    id: user.id,

    name: user.name,

    email: user.email,

    roles,

    permissions,
  };

  const access_token = generateAccessToken(payload);

  const refresh_token = generateRefreshToken(payload);

  return {
    status: 200,

    body: {
      success: true,

      message: "Login successful.",

      user: {
        id: user.id,

        name: user.name,

        email: user.email,

        roles,

        permissions,
      },

      access_token,

      refresh_token,
    },
  };
};
