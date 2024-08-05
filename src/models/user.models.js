import jwt from 'jsonwebtoken'
import { JWT_SECRETA, pool } from '../../database/config.js'
import bcryptjs from 'bcryptjs'
// import format from 'pg-format'

export const createUserModels = async ({ email, password, rol, lenguage }) => {
    const hashedPassword = await bcryptjs.hash(password, 10)
    const SQLQuery = {
        text: 'INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4) RETURNING *',
        values: [email, hashedPassword, rol, lenguage],
    }
    const response = await pool.query(SQLQuery)
    return response.rows[0]
}

export const getUserModels = async () => {
    try {
        const SQLQuery = {
            text: 'SELECT * FROM usuarios',
            // text: 'SELECT * FROM usuarios WHERE ID = $1',
            // values: [id],
        }
        const response = await pool.query(SQLQuery)
        return response.rows
    } catch (error) {
        console.log('Error al obtener los usuarios: ', error.message)
        throw error
    }
}
export const authenticateUserModels = async (email, password) => {
    try {
        console.log('Intentando autenticar al usuario:', email)
        const SQLQuery = {
            text: 'SELECT * FROM usuarios WHERE email = $1',
            values: [email],
        }
        const response = await pool.query(SQLQuery)
        const user = response.rows[0]

        if (!user) {
            console.log('Usuario no encontrado:', email)
            throw new Error('Usuario no encontrado')
        }

        const isMatch = await bcryptjs.compare(password, user.password)

        if (!isMatch) {
            console.log('Contraseña incorrecta para el usuario:', email)
            throw new Error('Contraseña incorrecta')
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                rol: user.rol,
            },
            JWT_SECRETA,
            { expiresIn: '1h' }
        )
        return {
            user,
            token,
        }
    } catch (error) {
        console.log('Error en la autenticación: ', error.message)
        throw new Error('Error en la autenticación')
    }
}
