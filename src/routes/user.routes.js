import { Router } from 'express'
import {
    createUserControllers,
    getUserControllers,
    loginUserControllers,
    notFound,
} from '../controllers/user.controllers.js'
import { authenticateToken } from '../../middleware/authenticateToken.js'
import { logRequests } from '../../middleware/logRequests.js'

const router = Router()

router.use(logRequests)

// router.get('/usuarios', /*authenticateToken,*/ getUserControllers)
router.get('/usuarios', authenticateToken, getUserControllers)
router.post('/usuarios', createUserControllers)
router.post('/login', loginUserControllers)
router.all('*', notFound)
// router.post('/usuarios', createUserControllers)
// router.post('/login', createUserModels)

export default router
