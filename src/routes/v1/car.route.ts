import { Router } from "express";
import { CarController } from "../../controllers/car.controller";
import { AuthMiddleware } from "../../middlewares/current_user.middleware";
import { checkPermission } from "../../middlewares/rbac.middleware";

const carRouter = Router();

carRouter.get(
	"/",
	AuthMiddleware,
	checkPermission("cars", "READ"),
	CarController.getAll
);
carRouter.patch(
	"/:id/set/active",
	AuthMiddleware,
	checkPermission("cars", "UPDATE"),
	CarController.setActive
);

export default carRouter;
