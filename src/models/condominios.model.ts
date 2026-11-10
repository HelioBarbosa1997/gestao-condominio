import db from "../lib/db";
import { CondominioType, CreateCondominio } from "../uuid/types";

export const CondominiosModel = {
    async create(condominio: CondominioType): Promise<CondominioType | null> {
        try {
            const query = `INSERT INTO condominios(id, nome, endereco, cidade, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`
            const VALUES = [
                condominio.id,
                condominio.nome,
                condominio.endereco,
                condominio.cidade,
                new Date(),
                new Date()
            ];
            const result = await db.query(query, VALUES);
            if (result.rows.length === 0 || !result?.rows[0]) return null;
            return result.rows[0];
        } catch (error) {
            return null;
        }
    },
    async getAll(): Promise<CondominioType[] | null> {
        try {
            const result = await db.query(`SELECT * FROM condominios ORDER BY id DESC`);
            return result.rows.length > 0 ? result.rows : null;
        } catch (error) {
            return null;
        }
    },
    async get(id: string): Promise<CondominioType | null> {
        try {
            const result = await db.query(`SELECT * FROM condominios WHERE id = $1`, [id]);
            return result.rows.length > 0 ? result.rows[0] : null;
        } catch (error) {
            return null;
        }
    },
    async update(id: string, updatedCondominio: CreateCondominio): Promise<CondominioType | null> {
        try {
            const query = `UPDATE condominios SET nome = $1, endereco = $2, cidade = $3, updated_at = $4 WHERE id = $5 RETURNING *`;
            const VALUES = [
                updatedCondominio.nome,
                updatedCondominio.endereco,
                updatedCondominio.cidade,
                new Date(),
                id
            ];
            const result = await db.query(query, VALUES);
            return result.rows.length > 0 ? result.rows[0] : null;
        } catch (error) {
            return null;
        }
    },
    async delete(id: string): Promise<CondominioType | null> {
        try {
            const result = await db.query(`DELETE FROM condominios WHERE id = $1`, [id]);
            if (result.rows.length === 0 || !result?.rows[0]) return null;
            return result.rows[0];
        } catch (error) {
            return null;
        }
    }
};