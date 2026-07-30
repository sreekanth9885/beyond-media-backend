import bcrypt from "bcrypt";
import userRepository from "./user.repository";

class UserService {
  async createUser(data: any) {
    // Check email already exists
    const exists = await userRepository.findByEmail(data.email);

    if (exists) {
      throw new Error("Email already exists.");
    }

    // Hash password
    data.password = await bcrypt.hash(data.password, 10);

    // Create user with roles
    const userId = await userRepository.create(data);

    // Return created user
    return {
      ...(await userRepository.findById(userId)),
      roles: await userRepository.getRoles(userId),
    };
  }

  async getUsers() {
    return await userRepository.findAll();
  }

  async getUser(id: number) {
    const user = await userRepository.findById(id);

    if (!user) {
      throw new Error("User not found.");
    }

    return {
      ...user,
      roles: await userRepository.getRoles(id),
    };
  }

  async updateUser(id: number, data: any) {
    const user = await userRepository.findById(id);

    if (!user) {
      throw new Error("User not found.");
    }

    // Check duplicate email
    const emailExists = await userRepository.findByEmail(data.email, id);

    if (emailExists) {
      throw new Error("Email already exists.");
    }

    await userRepository.update(id, data);

    return {
      ...(await userRepository.findById(id)),
      roles: await userRepository.getRoles(id),
    };
  }

  async deleteUser(id: number) {
    const user = await userRepository.findById(id);

    if (!user) {
      throw new Error("User not found.");
    }

    await userRepository.delete(id);
  }
}

export default new UserService();
