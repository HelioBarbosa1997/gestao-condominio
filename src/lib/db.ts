import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const db = {
    async query(text: string, params?: any[]) {
        const client = await pool.connect();

        try {
            return await client.query(text, params);
        } finally {
            client.release();
        }
    },
};

export default db;