import { Router } from "express";
import loginRoute from './login'
import signupRoute from './signup'


const router = Router()

router.use('/login', loginRoute)
router.use('/signup', signupRoute)

export default router