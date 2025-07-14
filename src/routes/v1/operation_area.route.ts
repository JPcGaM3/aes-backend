import { Router } from "express";
import { OperationAreaController } from "../../controllers/operation_area.controller";
import { AuthMiddleware } from "../../middlewares/current_user.middleware";
import { checkPermission } from "../../middlewares/rbac.middleware";

const operationAreaRouter = Router();

operationAreaRouter.get(
	"/",
	AuthMiddleware,
	checkPermission("operation_area", "READ"),
	OperationAreaController.getAll
);
operationAreaRouter.get(
	"/:id",
	AuthMiddleware,
	checkPermission("operation_area", "READ"),
	OperationAreaController.getById
);
operationAreaRouter.get(
	"/match-customer-type",
	AuthMiddleware,
	checkPermission("operation_area", "READ"),
	OperationAreaController.getByCustomerType
);

export default operationAreaRouter;
