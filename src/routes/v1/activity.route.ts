import { Router } from "express";
import { ActivityController } from "../../controllers/activity.controller";
import { AuthMiddleware } from "../../middlewares/current_user.middleware";
import { checkPermission } from "../../middlewares/rbac.middleware";

const activityRouter = Router();

activityRouter.get(
	"/",
	AuthMiddleware,
	checkPermission("activities", "READ"),
	ActivityController.getAll
);

export default activityRouter;
