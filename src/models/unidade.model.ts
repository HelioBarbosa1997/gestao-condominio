import db from "../lib/db";
import { CreateUnidade, UnidadeType } from "../uuid/types";

export const UnidadeModel = {
    async create (unidade: UnidadeType): Promise<UnidadeType | null> {
        try {
            const query = `INSERT INTO unidades(id, condominio_id, numero, bloco, fracao, propretario_id, create_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *`

            const VALUES = [
                unidade.id,
                unidade.condominio_id,
                unidade.numero,
                unidade.bloco,
                unidade.fracao,
                unidade.propretario_id,
                new Date(),
                new Date()
            ];
            const result = await db.query(query, VALUES);
            if (result.rows.length === 0 || !result?.rows[0]) return null;
            return result.rows[0];

        }catch (error) {
            return null;
        }
    },
    async getAll(): Promise<UnidadeType[] | null> {
        try {
            const result = await db.query(`SELECT * FROM unidades ORDER BY id DESC`);
            return result.rows.length > 0 ? result.rows : null;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async get(id: string): Promise<UnidadeType | null> {
        try {
            const result = await db.query(
                `SELECT * FROM unidades WHERE id = $1`,
                [id]
            );
            if (result.rows.length === 0 || !result?.rows[0]) return null;
            return result.rows[0];
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async update(id: string, updatedUnidade: CreateUnidade): Promise<UnidadeType | null> {
        try {
            const query = `
        UPDATE unidades
        SET condominio_id = $1, numero = $2, bloco = $3, fracao = $4, propretario_id = $5, updated_at = $6
        WHERE id = $7
        RETURNING *`;

            const values = [
                updatedUnidade.condominio_id,
                updatedUnidade.numero,
                updatedUnidade.bloco,
                updatedUnidade.fracao,
                updatedUnidade.propretario_id,
                new Date(),
                id
            ];

            const result = await db.query(query, values);
            if (result.rows.length === 0 || !result?.rows[0]) return null;
            return result.rows[0];
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async delete(id: string): Promise<UnidadeType | null> {
        try {
            const query = `DELETE FROM unidades WHERE id = $1 RETURNING *`;
            const result = await db.query(query, [id]);
            if (result.rows.length === 0 || !result?.rows[0]) return null;
            return result.rows[0];
        } catch (error) {
            console.log(error);
            return null;
        }
    },

}