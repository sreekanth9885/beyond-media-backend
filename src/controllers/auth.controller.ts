import { Request, Response } from "express";
import bcrypt from "bcrypt";
import db from "../config/db";
import { generateToken } from "../utils/jwt";

export const login = async (req: Request, res: Response) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required"
            });
        }

        const [rows]: any = await db.execute(
            "SELECT * FROM users WHERE email=?",
            [email]
        );

        if (rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const user = rows[0];

        const match = await bcrypt.compare(
            password,
            user.password
        );

        if (!match) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = generateToken(user.id);

        delete user.password;

        return res.json({
            success: true,
            message: "Login successful",
            token,
            user
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
    
};
export const profile = async (req: any, res: Response) => {

    const [rows]: any = await db.execute(
        "SELECT id,name,email,created_at FROM users WHERE id=?",
        [req.userId]
    );

    res.json({
        success: true,
        user: rows[0]
    });

};