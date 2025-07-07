import { Router } from "express";
import { ToolTypeController } from "../../controllers/tool_type.controller";
import { AuthMiddleware } from "../../middlewares/current_user.middleware";

const toolTypeRouter = Router();

toolTypeRouter.get("/", AuthMiddleware, ToolTypeController.getAll);
toolTypeRouter.get(
	"/:activity_id",
	AuthMiddleware,
	ToolTypeController.getByActivity
);
toolTypeRouter.get("/:id/price", AuthMiddleware, ToolTypeController.getPrice);

export default toolTypeRouter;
