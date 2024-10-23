import { Router } from "express";
import userRouter from './user.js'
import authRouter from './auth.js'

const router = new Router();

router.use('/users', userRouter)
router.use('/auth', authRouter)

export default router