import { Router } from "express";
import roleController from "../controllers/roleController.js";
import authenticationMiddleware from "../middlewares/authenticationMiddleware.js";
import authorizeRoles from "../middlewares/authorizationMiddleware.js";

const router = new Router();

router.get('/', roleController.getAllRolesAsync)


export default router