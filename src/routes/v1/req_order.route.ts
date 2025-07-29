import { Router } from "express";
import { RequestOrderController } from "../../controllers/req_order.controller";
import { uploadExcels } from "../../middlewares/excel_upload.middleware";
import { uploadImages } from "../../middlewares/image_upload.middleware";
import { AuthMiddleware } from "../../middlewares/current_user.middleware";
import { checkPermission } from "../../middlewares/rbac.middleware";

const reqOrderRouter = Router();

reqOrderRouter.get(
	"/",
	AuthMiddleware,
	checkPermission("requestorders", "READ"),
	RequestOrderController.getAll
);
reqOrderRouter.get(
	"/:id/get-task",
	AuthMiddleware,
	checkPermission("requestorders", "READ"),
	checkPermission("taskorders", "READ"),
	RequestOrderController.getByIdWithTasks
);

reqOrderRouter.post(
	"/create/key-in",
	AuthMiddleware,
	checkPermission("requestorders", "CREATE"),
	checkPermission("taskorders", "CREATE"),
	RequestOrderController.createFormKeyIn
);
reqOrderRouter.post(
	"/create/excel",
	AuthMiddleware,
	uploadExcels.array("files", 5),
	checkPermission("requestorders", "CREATE"),
	checkPermission("taskorders", "CREATE"),
	RequestOrderController.createFromExcel
);
reqOrderRouter.patch(
	"/:id/update",
	AuthMiddleware,
	checkPermission("requestorders", "UPDATE"),
	RequestOrderController.update
);
reqOrderRouter.patch(
	"/:id/set/status",
	AuthMiddleware,
	checkPermission("requestorders", "UPDATE"),
	RequestOrderController.setStatus
);
reqOrderRouter.patch(
	"/:id/set/active",
	AuthMiddleware,
	checkPermission("requestorders", "UPDATE"),
	RequestOrderController.setActive
);

reqOrderRouter.post(
	"/:id/set/evidence",
	AuthMiddleware,
	uploadImages.array("files", 5),
	checkPermission("requestorders", "UPDATE"),
	checkPermission("attachment", "CREATE"),
	RequestOrderController.setEvidence
);
reqOrderRouter.get(
	"/:id/get/evidence",
	AuthMiddleware,
	checkPermission("attachment", "READ"),
	RequestOrderController.getEvidence
);

export default reqOrderRouter;
