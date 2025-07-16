import { Router } from "express";
import { TaskOrderController } from "../../controllers/task_order.controller";
import { AuthMiddleware } from "../../middlewares/current_user.middleware";
import { checkPermission } from "../../middlewares/rbac.middleware";

const taskOrderRouter = Router();

taskOrderRouter.post(
	"/create",
	AuthMiddleware,
	checkPermission("taskorders", "CREATE"),
	TaskOrderController.create
);

taskOrderRouter.get(
	"/:id",
	AuthMiddleware,
	checkPermission("taskorders", "READ"),
	TaskOrderController.getById
);

taskOrderRouter.get(
	"/:assigned_id/get-task",
	AuthMiddleware,
	checkPermission("taskorders", "READ"),
	TaskOrderController.getAssigned
);

taskOrderRouter.patch(
	"/:id/update",
	AuthMiddleware,
	checkPermission("taskorders", "UPDATE"),
	TaskOrderController.update
);
taskOrderRouter.patch(
	"/:id/set/assigned",
	AuthMiddleware,
	checkPermission("taskorders", "UPDATE"),
	TaskOrderController.setAssigned
);
taskOrderRouter.patch(
	"/:id/set/status",
	AuthMiddleware,
	checkPermission("taskorders", "UPDATE"),
	TaskOrderController.setStatus
);
taskOrderRouter.patch(
	"/:id/set/active",
	AuthMiddleware,
	checkPermission("taskorders", "UPDATE"),
	TaskOrderController.setActive
);
taskOrderRouter.patch(
	"/:id/set/actual-area",
	AuthMiddleware,
	checkPermission("taskorders", "UPDATE"),
	TaskOrderController.setActualArea
);

export default taskOrderRouter;
