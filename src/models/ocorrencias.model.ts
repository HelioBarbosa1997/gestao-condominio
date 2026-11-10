import db from "../lib/db";
import { CreateOcorrencias, OcorrenciasType } from "../uuid/types";


export const OcorrenciaModel = {
    async create(ocorrencia: OcorrenciasType): Promise<OcorrenciasType | null> {
        try {
            const query = `
                INSERT INTO ocorrencias(id, condominio_id, unidade_id, usuario_id, titulo, descricao, status, created_at,updated_at)
                VALUES ($1, $2, $3$, $4, $5, $6, $7, $8, $9)`

            const VALUES = [
                ocorrencia.id,
                ocorrencia.condominio_id,
                ocorrencia.unidade_id,
                ocorrencia.usuario_id,
                ocorrencia.titulo,
                ocorrencia.descricao,
                ocorrencia.status,
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

    async getAll(): Promise<OcorrenciasType[] | null> {
        try {
            const result = await db.query(`SELECT * FROM unidades ORDER BY id DESC`);
            return result.rows.length > 0 ? result.rows : null;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async get(id: string): Promise<OcorrenciasType | null> {
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

    async updated(id: string, updatedOcorrencias: CreateOcorrencias): Promise<OcorrenciasType | null> {
        try {
            const query = `
            UPDATE ocorrencia 
            SET condominio_id = $1, unidade_id = $2, usuario_id = $3, titulo = $4, descricao = $5, status = 6, updated_at = $7
            WHERE id = $8
            RETURNING *
            `;

            const values = [
                updatedOcorrencias.condominio_id,
                updatedOcorrencias.unidade_id,
                updatedOcorrencias.usuario_id,
                updatedOcorrencias.titulo,
                updatedOcorrencias.descricao,
                updatedOcorrencias.status,
                new Date(),
                id

            ];
            const result = await db.query(query, values);
            if (result.rows.length === 0 || !result?.rows[0]) return null;
            return result.rows[0];

        } catch (error) {
            return null
        }
    },
    
    async delete(id: string): Promise<OcorrenciasType | null> {
        try {
            const query = `DELETE FROM ocorrencias WHERE id = $1 RETURNING *`;
            const result = await db.query(query, [id]);
            if (result.rows.length === 0 || !result?.rows[0]) return null;
            return result.rows[0];
        } catch (error) {
            return null;
        }
    },
}