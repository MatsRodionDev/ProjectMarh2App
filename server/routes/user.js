import { Router } from "express";
import userController from "../controllers/userController.js";
import authenticationMiddleware from "../middlewares/authenticationMiddleware.js";

const router = new Router();

router.get('/',userController.getAllUsers)
router.get('/profile',authenticationMiddleware , userController.getUserById)


export default router