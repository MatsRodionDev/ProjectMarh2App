import { Router } from "express";
import taskController from "../controllers/taskController.js";
import authenticationMiddleware from "../middlewares/authenticationMiddleware.js";
import authorizeRoles from "../middlewares/authorizationMiddleware.js";

const router = new Router();

router.post('/:taskId/user', taskController.addUserToTask);
router.delete('/:taskId/user/:userId',  taskController.deleteUserFromTask);
router.patch('/:taskId/close', taskController.closeTask);
router.delete('/:taskId', authenticationMiddleware, authorizeRoles('Admin'), taskController.deleteTask);

export default router;