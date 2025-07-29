import { Router } from "express";
import { AuthMiddleware } from "../../middlewares/current_user.middleware";
import { checkPermission } from "../../middlewares/rbac.middleware";
import { SystemController } from "../../controllers/system_ctl.controller";

const sysctlRouter = Router();

sysctlRouter.get(
	"/clear-cache",
	AuthMiddleware,
	checkPermission("system_controls", "UPDATE"),
	SystemController.clearCache
);

export default sysctlRouter;
