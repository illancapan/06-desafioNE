import { createUserModels } from '../models/user.models.js'

export const createUserControllers = async (req, res) => {
    try {
        const { user } = req.body
        const newUser = await createUserModels(user)
        res.status(201).json({ user: newUser })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
