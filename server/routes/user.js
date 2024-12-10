import { Router } from "express";
import userController from "../controllers/userController.js";

const router = new Router();

router.get('/',userController.getAllUsers)
router.get('/:id', userController.getUserById)


export default router