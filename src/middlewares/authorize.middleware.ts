import { Request, Response, NextFunction } from "express";


declare global {
    namespace Express {
        interface Request {
            usuario?: {
                id: string;
                email: string;
                role?: string | undefined;
            }
        }
    }
}


export const authorize = (...perfisPermitidos: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {

        // Verificar se existe um utilizador autenticado
        if (!req.usuario) {
            return res.status(401).json({
                status: "error",
                message: "É necessário iniciar sessão."
            });
        }

        // Verificar se o perfil tem permissão
        if (
            !req.usuario.role ||
            !perfisPermitidos.includes(req.usuario.role)
        ) {
            return res.status(403).json({
                status: "error",
                message: "Não tens permissão para realizar esta operação."
            });
        } {
            return res.status(403).json({
                status: "error",
                message: "Não tens permissão para realizar esta operação."
            });
        }

        next();
    };
};
