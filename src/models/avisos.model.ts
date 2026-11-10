import db from "../lib/db";
import { AvisoType } from "../uuid/types";

export const AvisosModel = {
    async create (aviso: AvisoType): Promise<AvisoType | null> {
        try {
            const query = `INSERT INTO  avisos (id, condominio_id, titulo, mensagem, data_publicacao) 
                            VALUES (DEFAULT, $1, $2, $3, $4) RETURNING *`;
            const VALUES = [
                aviso.condominio_id, 
                aviso.titulo, 
                aviso.mensagem, 
                aviso.data_publicacao];
            const result = await db.query(query, VALUES);
            return result.rows.length > 0 ? result.rows[0] : null;
        }
        catch (error) {
            return null;
        }
    },

    async getAll(): Promise<AvisoType[] | null> {
        try {
            const result = await db.query(`SELECT * FROM avisos ORDER BY id DESC`);
            return result.rows.length > 0 ? result.rows : null;
        }
        catch (error) {
            return null;
        }
    },

    async get(id: string): Promise<AvisoType | null> {
        try {
            const result = await db.query(`SELECT * FROM avisos WHERE id = $1`, [id]);
            return result.rows.length > 0 ? result.rows[0] : null;
        }
        catch (error) {
            return null;
        }
    },

    async update(id: string, updatedAviso: AvisoType): Promise<AvisoType | null> {
        try {
            const query = `UPDATE avisos SET condominio_id = $1, titulo = $2, mensagem = $3, data_publicacao = $4 WHERE id = $5 RETURNING *`;
            const VALUES = [
                updatedAviso.condominio_id,
                updatedAviso.titulo,
                updatedAviso.mensagem,
                updatedAviso.data_publicacao,
                id
            ];
            const result = await db.query(query, VALUES);
            return result.rows.length > 0 ? result.rows[0] : null;
        }
        catch (error) {
            return null;
        }
    }, 
    async delete(id: string): Promise<AvisoType | null> {
        try {
            const result = await db.query(`DELETE FROM avisos WHERE id = $1 RETURNING *`, [id]);
            return result.rows.length > 0 ? result.rows[0] : null;
        }
        catch (error) {
            return null;
        }
    }
}
