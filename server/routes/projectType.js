import { Router } from "express";
import projectTypeController from "../controllers/projectTypeController.js";
import authenticationMiddleware from "../middlewares/authenticationMiddleware.js";
import authorizeRoles from "../middlewares/authorizationMiddleware.js";

const router = new Router();

router.get('/', projectTypeController.getAllProjectTypes)
router.get('/:projectTypeId', projectTypeController.getProjectType)

export default router