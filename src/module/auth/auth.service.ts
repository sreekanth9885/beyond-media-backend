import bcrypt from "bcrypt";
import authRepository from "./auth.repository";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../helpers/jwtHelper";

class AuthService {
  async login(data: any) {
    const { email, password } = data;

    // Validate request
    if (!email || !password) {
      throw new Error("Email and password are required.");
    }

    // Find user
    const user = await authRepository.findByEmail(email);

    if (!user) {
      throw new Error("Invalid email or password.");
    }

    // Compare password
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw new Error("Invalid email or password.");
    }

    // Convert roles to array
    const roles: string[] = user.roles ? user.roles.split(",") : [];

    // Convert permissions to array
    const permissions: string[] = user.permissions
      ? user.permissions.split(",")
      : [];

    // JWT Payload
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      roles,
      permissions,
    };

    // Generate Tokens
    const access_token = generateAccessToken(payload);

    const refresh_token = generateRefreshToken(payload);

    // Remove password before sending response
    delete user.password;

    return {
      success: true,

      message: "Login successful.",

      user: {
        ...user,

        roles,

        permissions,
      },

      access_token,

      refresh_token,
    };
  }
}

export default new AuthService();
