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
        message: "Email and Password are required",
      },
    };
  }

  const [rows]: any = await db.execute(
    `SELECT id,name,email
     FROM users
     WHERE email=? AND password=?
     LIMIT 1`,
    [email, password],
  );

  if (rows.length === 0) {
    return {
      status: 401,
      body: {
        success: false,
        message: "Invalid email or password",
      },
    };
  }

  const user = rows[0];

  const access_token = generateAccessToken({
    id: user.id,
    name: user.name,
    email: user.email,
  });

  const refresh_token = generateRefreshToken({
    id: user.id,
    name: user.name,
    email: user.email,
  });

  return {
    status: 200,
    body: {
      success: true,
      message: "Login successful",
      user,
      access_token,
      refresh_token,
    },
  };
};