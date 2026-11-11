
import jwt from "jsonwebtoken";

// Chave secreta para assinar os tokens
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET não está definida no .env");
}

// Gerar token JWT
export const generateToken = (payload: object): string => {

    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: "1d"
    });

};

// Verificar token JWT
export const verifyToken = (token: string) => {

    return jwt.verify(token, JWT_SECRET);

};
