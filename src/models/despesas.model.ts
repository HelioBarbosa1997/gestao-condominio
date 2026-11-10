import db from "../lib/db";
import { CreateDespesas, DespesasType } from "../uuid/types";

export const DespesasModel = {
    async create(despesas: DespesasType): Promise<DespesasType | null> {
        try {
            const query = `INSERT INTO despesas
            (id, condominio_id, categoria, valor, data_vencimento, data_pagamento, status, created_at, updated_at) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *`

            const VALUES = [
                despesas.id,
                despesas.condominio_id,
                despesas.categoria,
                despesas.valor,
                despesas.data_vencimento,
                despesas.data_pagamento,
                despesas.status,
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
    async getAll(): Promise<DespesasType[] | null> {
        try {
            const result = await db.query(`SELECT * FROM despesas ORDER BY id DESC`);
            return result.rows.length > 0 ? result.rows : null;
        } catch (error) {
            return null;
        }

    },
    async get(id: string): Promise<DespesasType | null> {
        try {
            const result = await db.query(`SELECT * FROM despesas WHERE id = $1`, [id]);
            return result.rows.length > 0 ? result.rows[0] : null;
        } catch (error) {
            return null;
        }
    },

    async update(id: string, updatedDespesas: CreateDespesas): Promise<DespesasType | null> {
        try {
            const query = `UPDATE despesas SET condominio_id = $1, categoria = $2, valor = $3, data_vencimento = $4, data_pagamento = $5, status = $6, updated_at = $7 WHERE id = $8 RETURNING *`;

            const VALUES = [
                updatedDespesas.condominio_id,
                updatedDespesas.categoria,
                updatedDespesas.valor,
                updatedDespesas.data_vencimento,
                updatedDespesas.data_pagamento,
                updatedDespesas.status,
                new Date(),
                id
            ];

            const result = await db.query(query, VALUES);
            return result.rows.length > 0 ? result.rows[0] : null;
        } catch (error) {
            return null;
        }
    },
    async delete(id: string): Promise<DespesasType | null> {
        try {
            const result = await db.query(`DELETE FROM despesas WHERE id = $1`, [id]);
            if (result.rows.length === 0 || !result?.rows[0]) return null;
            return result.rows[0];
        } catch (error) {
            return null;
        }
    }
}