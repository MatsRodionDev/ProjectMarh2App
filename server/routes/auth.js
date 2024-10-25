import { Router } from "express";
import authController from "../controllers/authController.js";
import authenticationMiddleware from "../middlewares/authenticationMiddleware.js";

const router = new Router();

router.post('/login', authController.login)
router.post('/registration', authController.registration)
router.get('/auth',authenticationMiddleware , authController.isAuth)

export default router