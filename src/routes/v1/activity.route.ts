import { Router } from "express";
import { ActivityController } from "../../controllers/activity.controller";

const activityRouter = Router();

activityRouter.get("/", ActivityController.getAll);

export default activityRouter;
