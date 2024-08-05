import {
    createUserModels,
    getUserModels,
    authenticateUserModels,
} from '../models/user.models.js'

export const notFound = (req, res) => {
    res.status(404).send('Not found No encontrado')
}

export const createUserControllers = async (req, res) => {
    try {
        const { email, password, rol, lenguage } = req.body

        if (!email || !password || !rol || !lenguage) {
            return res.status(400).json({
                message: 'Campos requeridos faltantes',
                error: 'Por favor, incluya email, password, rol y lenguage.',
            })
        }
        // crear el nuevo usuario
        const newUser = await createUserModels({
            email,
            password,
            rol,
            lenguage,
        })

        // responder con el usuario creado
        res.status(201).json({ user: newUser })
    } catch (error) {
        console.error('Error al crear el usuario:', error)
        res.status(400).json({
            message: 'Error al crear el usuario',
            error: error.message,
        })
    }
}

export const getUserControllers = async (req, res) => {
    try {
        const usuarios = await getUserModels()
        res.status(200).json({ usuarios })
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener los usuarios',
            error: error.message,
        })
    }
}

export const loginUserControllers = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                message: 'Campos requeridos faltantes',
                error: 'Por favor, incluya email y password.',
            })
        }
        const { user, token } = await authenticateUserModels(email, password)
        res.status(200).json({ user, token })
    } catch (error) {
        console.error('Error al iniciar sesión:', error.message)
        res.status(401).json({
            message: 'Error al iniciar sesión',
            error: error.message,
        })
    }
}
