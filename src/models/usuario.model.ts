import db from "../lib/db.js"
import { hashPassword } from "../uuid/passvord.js";
import { CreateUsuario, UsuarioType } from "../uuid/types.js";

export const UsuariosModel = {
    async create(user: CreateUsuario): Promise<UsuarioType | null> {
        try {
            const query = `
        INSERT INTO usuarios (nome, email, password, telefone, tipo, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`;

            const values = [
                user.nome,
                user.email,
                await hashPassword(user.password),
                user.telefone || null,
                user.tipo || "morador",
                new Date(),
                new Date(),
            ];

            const result = await db.query(query, values);
            if (result.rows.length === 0 || !result?.rows[0]) return null;
            return result.rows[0];
        } catch (error) {
            return null;
        }
    },

    async getAll(): Promise<UsuarioType[] | null> {
        try {
            const result = await db.query(`SELECT * FROM usuarios ORDER BY id DESC`);
            return result.rows.length > 0 ? result.rows : null;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async get(id: string): Promise<UsuarioType | null> {
        try {
            const result = await db.query(
                `SELECT * FROM usuarios WHERE id = $1`,
                [id]
            );
            if (result.rows.length === 0 || !result?.rows[0]) return null;
            return result.rows[0];
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async getByEmail(email: string): Promise<UsuarioType | null> {
        try {
            const result = await db.query(
                `SELECT * FROM usuarios WHERE email = $1`,
                [email]
            );
            if (result.rows.length === 0 || !result?.rows[0]) return null;
            return result.rows[0];
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async update(id: string, updatedUser: CreateUsuario): Promise<UsuarioType | null> {
        try {
            const query = `
        UPDATE usuarios
        SET nome = $1, email = $2, telefone = $3, tipo = $4, updated_at = $5
        WHERE id = $6
        RETURNING *`;

            const values = [
                updatedUser.nome,
                updatedUser.email,
                updatedUser.telefone || null,
                updatedUser.tipo || "morador",
                new Date(),
                id,
            ];

            const result = await db.query(query, values);
            if (result.rows.length === 0 || !result?.rows[0]) return null;
            return result.rows[0];
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async delete(id: string): Promise<UsuarioType | null> {
        try {
            const query = `DELETE FROM usuarios WHERE id = $1 RETURNING *`;
            const result = await db.query(query, [id]);
            if (result.rows.length === 0 || !result?.rows[0]) return null;
            return result.rows[0];
        } catch (error) {
            console.log(error);
            return null;
        }
    },
};