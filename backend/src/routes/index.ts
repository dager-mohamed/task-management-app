import { Router } from "express";
import userRoute from './user'
import taskRoute from './tasks/index'

const router = Router()

router.use('/user', userRoute)
router.use('/task', taskRoute)

export default router