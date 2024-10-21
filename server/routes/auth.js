import { Router } from "express";
import authController from "../controllers/authController";

const router = new Router();

router.post('/login', authController.login)
router.post('/registration', authController.registration)
router.get('/auth',)

export default router