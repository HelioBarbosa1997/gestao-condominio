import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.js";

declare global {
    namespace Express {
        interface Request {
            usuario?: {
                id: string;
                email: string;
                role?: string;
            }
        }
    }
}

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {

        // Receber o token do cabeçalho
        const authorization = req.headers.authorization;

        if (!authorization || !authorization.startsWith("Bearer ")) {
            return res.status(401).json({
                status: "error",
                message: "Acesso não autorizado. Token não fornecido."
            });
        }

        // Extrair o token
        const token = authorization.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                status: "error",
                message: "Token não fornecido."
            });
        }

        // Verificar o token
        const decoded = verifyToken(token);

        if (
            typeof decoded === "string" ||
            !decoded ||
            typeof decoded.id !== "string" ||
            typeof decoded.email !== "string" ||
            typeof decoded.role !== "string"
        ) {
            return res.status(401).json({
                status: "error",
                message: "Token inválido ou expirado."
            });
        }

            // Guardar os dados do utilizador na requisição
            req.usuario = {
                id: decoded.id,
                email: decoded.email,
                role: decoded.role
            };

        next();

    } catch (error) {

        return res.status(401).json({
            status: "error",
            message: "Token inválido ou expirado."
        });

    }

};
