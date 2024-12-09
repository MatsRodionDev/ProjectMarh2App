import { Router } from "express";
import projectController from "../controllers/projectController.js";

const router = new Router();

router.get('/', projectController.getProjects)
router.get('/:id', projectController.getProjectById)
router.post('/', projectController.createProject)
router.post('/:projectId/user', projectController.addUserToProject)
router.post('/:projectId/task', projectController.createTaskToProject)
router.delete('/:id', projectController.deleteProject)


export default router