import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
    userId?: number;
}

export const authenticate = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "Token missing"
        });
    }

    const token = authHeader.split(" ")[1];

    try {

        const decoded: any = jwt.verify(
            token,
            process.env.JWT_SECRET!
        );

        req.userId = decoded.id;

        next();

    } catch {

        return res.status(401).json({
            success: false,
            message: "Invalid Token"
        });

    }

};