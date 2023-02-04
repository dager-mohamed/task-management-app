import { Router } from "express";
import userRoute from './user'
import taskRoute from './tasks/index'

const router = Router()

router.use('/user', userRoute)
router.use('/task', taskRoute)

router.get('/', (req, res) => {
    res.status(200).send("it works!")
})
export default router