import { Router } from "express";
import { ToolTypeController } from "../../controllers/tool_type.controller";

const toolTypeRouter = Router();

toolTypeRouter.get("/", ToolTypeController.getAll);
toolTypeRouter.get("/:id/price", ToolTypeController.getPrice);

export default toolTypeRouter;
