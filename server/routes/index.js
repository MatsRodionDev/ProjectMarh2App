import { Router } from "express";
import userRouter from './user.js'
import authRouter from './auth.js'
import projectRouter from './project.js'

const router = new Router();

router.use('/users', userRouter)
router.use('/auth', authRouter)
router.use('/projects', projectRouter)

export default router