import { pool } from '../../database/config.js'
import bcryptjs from 'bcryptjs'
// import format from 'pg-format'

export const createUserModels = async ({ email, password, rol, lenguage }) => {
    const hashedPassword = await bcryptjs.hash(password, 10)
    const SQLQuery = {
        text: 'INSERT INTO users (email, password, rol, lenguage) VALUES ($1, $2, $3, $4) RETURNING *',
        values: [email, hashedPassword, rol, lenguage],
    }
    const response = await pool.query(SQLQuery)
    return response.rows[0]
}
