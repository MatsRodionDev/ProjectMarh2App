import { Router } from "express";
import projectController from "../controllers/projectController.js";

const router = new Router();


router.get('/', projectController.getProjects)
router.get('/:id', projectController.getProjectById)
router.post('/', projectController.createProject)
router.delete('/:id', projectController.deleteProject)


export default router