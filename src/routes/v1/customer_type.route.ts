import { Router } from "express";
import { CustomerTypeController } from "../../controllers/customer_type.controller";
import { AuthMiddleware } from "../../middlewares/current_user.middleware";
import { checkPermission } from "../../middlewares/rbac.middleware";

const customerTypeRouter = Router();

customerTypeRouter.get(
	"/",
	AuthMiddleware,
	checkPermission("customer_type", "READ"),
	CustomerTypeController.getAll
);
customerTypeRouter.get(
	"/:id",
	AuthMiddleware,
	checkPermission("customer_type", "READ"),
	CustomerTypeController.getById
);
customerTypeRouter.get(
	"/:name",
	AuthMiddleware,
	checkPermission("customer_type", "READ"),
	CustomerTypeController.getByName
);

export default customerTypeRouter;
