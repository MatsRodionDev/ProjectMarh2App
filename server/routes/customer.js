import { Router } from "express";
import customerController from "../controllers/customerController.js";
import authenticationMiddleware from "../middlewares/authenticationMiddleware.js";
import authorizeRoles from "../middlewares/authorizationMiddleware.js";

const router = new Router();

router.get('/', customerController.getAllCustomers)
router.get('/:customerId', customerController.getCustomer)
router.delete('/:customerId', customerController.deleteCustomer)
router.put('/:customerId', customerController.updateCustomer)
router.post('/', customerController.addCustomer)

export default router