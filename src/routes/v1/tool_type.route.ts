import { Router } from "express";
import { ToolTypeController } from "../../controllers/tool_type.controller";
import { AuthMiddleware } from "../../middlewares/current_user.middleware";
import { checkPermission } from "../../middlewares/rbac.middleware";

const toolTypeRouter = Router();

toolTypeRouter.get(
	"/",
	AuthMiddleware,
	checkPermission("tool_types", "READ"),
	ToolTypeController.getAll
);
toolTypeRouter.get(
	"/:activity_id",
	AuthMiddleware,
	checkPermission("tool_types", "READ"),
	ToolTypeController.getByActivity
);
toolTypeRouter.get(
	"/:id/price",
	AuthMiddleware,
	checkPermission("tool_types", "READ"),
	ToolTypeController.getPrice
);

export default toolTypeRouter;
