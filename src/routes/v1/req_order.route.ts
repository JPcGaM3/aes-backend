import { Router } from "express";
import { RequestOrderController } from "../../controllers/req_order.controller";
import { uploadExcels } from "../../middlewares/excel_upload.middleware";
import { uploadImages } from "../../middlewares/image_upload.middleware";

const reqOrderRouter = Router();

reqOrderRouter.get("/", RequestOrderController.getAll);
reqOrderRouter.post("/create/key-in", RequestOrderController.createFormKeyIn);
reqOrderRouter.post(
  "/create/excel",
  uploadExcels.array("files", 5),
  RequestOrderController.createFromExcel
);
reqOrderRouter.patch("/:id/update", RequestOrderController.update);
reqOrderRouter.post("/:id/get-task", RequestOrderController.getByIdWithTasks);
reqOrderRouter.patch("/:id/set/status", RequestOrderController.setStatus);

reqOrderRouter.post(
  "/:id/set/evidence",
  uploadImages.array("files", 5),
  RequestOrderController.setEvidence
);
reqOrderRouter.get("/:id/get/evidence", RequestOrderController.getEvidence);

export default reqOrderRouter;
