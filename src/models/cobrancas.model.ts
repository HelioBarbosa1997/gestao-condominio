import db from "../lib/db";
import { CobrancasType, CreateCobranca } from "../uuid/types";

export const CobrancasModel = {
    async create(cobranca: CobrancasType): Promise<CobrancasType | null> {
        try {
            const query = `INSERT INTO cobrancas (unidade_id, valor, data_vencimento, data_pagamento, status, descricao, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
            const VALUES = [
                cobranca.unidade_id,
                cobranca.valor,
                cobranca.data_vencimento,
                cobranca.data_pagamento,
                cobranca.status,
                cobranca.descricao,
                new Date(),
                new Date()
            ];
            const result = await db.query(query, VALUES);
            return result.rows.length > 0 ? result.rows[0] : null;
        } catch (error) {
            return null;
        }
    },
    async getAll(): Promise<CobrancasType[] | null> {
        try {
            const result = await db.query(`SELECT * FROM cobrancas ORDER BY id DESC`);
            return result.rows.length > 0 ? result.rows : null;
        } catch (error) {
            return null;
        }
    },
    async get(id: string): Promise<CobrancasType | null> {
        try {
            const result = await db.query(`SELECT * FROM cobrancas WHERE id = $1`, [id]);
            return result.rows.length > 0 ? result.rows[0] : null;
        } catch (error) {
            return null;
        }
    },
    async update(id: string, updatedCobranca: CreateCobranca): Promise<CobrancasType | null> {
        try {
            const query = `UPDATE cobrancas SET unidade_id = $1, valor = $2, data_vencimento = $3, data_pagamento = $4, status = $5, descricao = $6, updated_at = $7 WHERE id = $8 RETURNING *`;
            const VALUES = [
                updatedCobranca.unidade_id,
                updatedCobranca.valor,
                updatedCobranca.data_vencimento,
                updatedCobranca.data_pagamento,
                updatedCobranca.status,
                updatedCobranca.descricao,
                new Date(),
                id
            ];
            const result = await db.query(query, VALUES);
            return result.rows.length > 0 ? result.rows[0] : null;
        } catch (error) {
            return null;
        }
    },
    async delete(id: string): Promise<CobrancasType | null> {
        try {
            const result = await db.query(`DELETE FROM cobrancas WHERE id = $1`, [id]);
            if (result.rows.length === 0 || !result?.rows[0]) return null;
            return result.rows[0];
        } catch (error) {
            return null;
        }
    }
};