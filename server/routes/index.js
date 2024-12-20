import { Router } from "express";
import userRouter from './user.js'
import authRouter from './auth.js'
import projectRouter from './project.js'
import taskRouter from './task.js'
import customerRouter from './customer.js'
import projectTypeRouter from './projectType.js'
import roleRouter from './role.js'

const router = new Router();

router.use('/users', userRouter)
router.use('/auth', authRouter)
router.use('/projects', projectRouter)
router.use('/tasks', taskRouter)
router.use('/customers', customerRouter)
router.use('/types', projectTypeRouter)
router.use('/roles', roleRouter)

export default router