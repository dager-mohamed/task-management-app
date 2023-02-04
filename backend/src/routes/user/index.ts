import { Router } from "express";
import loginRoute from './login'
import signupRoute from './signup'
import infoRoute from './info'


const router = Router()

router.use('/login', loginRoute)
router.use('/signup', signupRoute)
router.use('/info', infoRoute)

export default router