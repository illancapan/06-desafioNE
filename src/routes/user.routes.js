import { Router } from 'express'
import { createUserControllers } from '../controllers/user.controllers.js'

const router = Router()

router.post('/usuarios', createUserControllers)
// router.post('/usuarios', createUserControllers)
// router.post('/login', createUserModels)

export default router
