import { Router } from "express";
import taskController from "../controllers/taskController.js";

const router = new Router();

router.post('/:taskId/user', taskController.addUserToTask);
router.delete('/:taskId/user/:userId', taskController.deleteUserFromTask);
router.patch('/:taskId/close', taskController.closeTask);
router.delete('/:taskId', taskController.deleteTask);

export default router;