import { Router } from "express";
import projectController from "../controllers/projectController.js";
import authenticationMiddleware from "../middlewares/authenticationMiddleware.js";
import authorizeRoles from "../middlewares/authorizationMiddleware.js";

const router = new Router();

router.get('/', projectController.getProjects)
router.get('/:id', projectController.getProjectById)
router.post('/', projectController.createProject)
router.post('/:projectId/user', authenticationMiddleware, authorizeRoles('Admin'), projectController.addUserToProject)
router.post('/:projectId/task', authenticationMiddleware, authorizeRoles('Admin'), projectController.createTaskToProject)
router.delete('/:id',authenticationMiddleware, authorizeRoles('Admin'), projectController.deleteProject)
router.put('/:id',authenticationMiddleware, authorizeRoles('Admin'), projectController.updateProject)

export default router