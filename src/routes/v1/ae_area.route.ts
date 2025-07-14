import { Router } from "express";
import { AEAreaController } from "../../controllers/ae_area.controller";
import { AuthMiddleware } from "../../middlewares/current_user.middleware";
import { checkPermission } from "../../middlewares/rbac.middleware";

const aeAreaRouter = Router();

aeAreaRouter.post(
	"/",
	AuthMiddleware,
	checkPermission("ae_area", "CREATE"),
	AEAreaController.create
);

aeAreaRouter.patch(
	"/:id",
	AuthMiddleware,
	checkPermission("ae_area", "UPDATE"),
	AEAreaController.update
);

aeAreaRouter.get("/", AEAreaController.getAll);

export default aeAreaRouter;
