import { Router } from "express";
import userController from "../controllers/userController.js";
import authenticationMiddleware from "../middlewares/authenticationMiddleware.js";
import authorizeRoles from "../middlewares/authorizationMiddleware.js";
import { uploadMiddleware } from "../middlewares/uploadMiddleware.js";

const router = new Router();

router.get('/',userController.getAllUsers)
router.get('/all',userController.getAll)
router.get('/profile',authenticationMiddleware , userController.getUserById)
router.put('/:id',authenticationMiddleware, authorizeRoles('Admin'), userController.updateUserRole)
router.patch('/upload', authenticationMiddleware, uploadMiddleware, userController.uploadImage);
router.delete('/upload', authenticationMiddleware, userController.deleteImage);

export default router