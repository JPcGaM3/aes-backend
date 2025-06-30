import { Router } from "express";
import { RequestOrderController } from "../../controllers/req_order.controller";
import { uploadExcels } from "../../middlewares/excel_upload.middleware";
import { uploadImages } from "../../middlewares/image_upload.middleware";
import { AuthMiddleware } from "../../middlewares/current_user.middleware";

const reqOrderRouter = Router();

reqOrderRouter.get("/", AuthMiddleware, RequestOrderController.getAll);
reqOrderRouter.get(
  "/:id/get-task",
  AuthMiddleware,
  RequestOrderController.getByIdWithTasks
);

reqOrderRouter.post(
  "/create/key-in",
  AuthMiddleware,
  RequestOrderController.createFormKeyIn
);
reqOrderRouter.post(
  "/create/excel",
  AuthMiddleware,
  uploadExcels.array("files", 5),
  RequestOrderController.createFromExcel
);
reqOrderRouter.patch(
  "/:id/update",
  AuthMiddleware,
  RequestOrderController.update
);
reqOrderRouter.patch(
  "/:id/set/status",
  AuthMiddleware,
  RequestOrderController.setStatus
);
reqOrderRouter.patch(
  "/:id/set/active",
  AuthMiddleware,
  RequestOrderController.setActive
);

reqOrderRouter.post(
  "/:id/set/evidence",
  AuthMiddleware,
  uploadImages.array("files", 5),
  RequestOrderController.setEvidence
);
reqOrderRouter.get(
  "/:id/get/evidence",
  AuthMiddleware,
  RequestOrderController.getEvidence
);

export default reqOrderRouter;
