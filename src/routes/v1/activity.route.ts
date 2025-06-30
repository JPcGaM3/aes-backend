import { Router } from "express";
import { ActivityController } from "../../controllers/activity.controller";
import { AuthMiddleware } from "../../middlewares/current_user.middleware";

const activityRouter = Router();

activityRouter.get("/", ActivityController.getAll);

export default activityRouter;
