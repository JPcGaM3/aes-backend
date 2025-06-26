import { Router } from "express";
import { TaskOrderController } from "../../controllers/task_order.controller";

const taskOrderRouter = Router();

taskOrderRouter.get("/:assigned_id/get-task", TaskOrderController.getAssigned);

taskOrderRouter.patch("/:id/update", TaskOrderController.update);
taskOrderRouter.patch("/:id/set/assigned", TaskOrderController.setAssigned);
taskOrderRouter.patch("/:id/set/status", TaskOrderController.setStatus);
taskOrderRouter.patch("/:id/set/active", TaskOrderController.setActive);
taskOrderRouter.patch(
  "/:id/set/actual-area",
  TaskOrderController.setActualArea
);

export default taskOrderRouter;
