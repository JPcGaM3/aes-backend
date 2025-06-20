import { Router } from "express";
import { TaskOrderController } from "../../controllers/task_order.controller";

const taskOrderRouter = Router();

taskOrderRouter.put("/update", TaskOrderController.update);
taskOrderRouter.patch("/:id/status", TaskOrderController.updateStatus);

export default taskOrderRouter;
