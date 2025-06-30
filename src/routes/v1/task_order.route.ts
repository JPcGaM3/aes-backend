import { Router } from "express";
import { TaskOrderController } from "../../controllers/task_order.controller";
import { AuthMiddleware } from "../../middlewares/current_user.middleware";

const taskOrderRouter = Router();

taskOrderRouter.get(
  "/:assigned_id/get-task",
  AuthMiddleware,
  TaskOrderController.getAssigned
);

taskOrderRouter.patch(
  "/:id/update",
  AuthMiddleware,
  TaskOrderController.update
);
taskOrderRouter.patch(
  "/:id/set/assigned",
  AuthMiddleware,
  TaskOrderController.setAssigned
);
taskOrderRouter.patch(
  "/:id/set/status",
  AuthMiddleware,
  TaskOrderController.setStatus
);
taskOrderRouter.patch(
  "/:id/set/active",
  AuthMiddleware,
  TaskOrderController.setActive
);
taskOrderRouter.patch(
  "/:id/set/actual-area",
  AuthMiddleware,
  TaskOrderController.setActualArea
);

export default taskOrderRouter;
