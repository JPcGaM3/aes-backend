import { Router } from "express";
import { RequestOrderController } from "../../controllers/req_order.controller";
import { upload } from "../../middlewares/upload.middleware";

const reqOrderRouter = Router();

reqOrderRouter.get("/", RequestOrderController.getAll);
reqOrderRouter.post("/create/key-in", RequestOrderController.createFormKeyIn);
reqOrderRouter.post(
  "/create/excel",
  upload.array("files", 5),
  RequestOrderController.createFromExcel
);
reqOrderRouter.patch("/:id/update", RequestOrderController.update);
reqOrderRouter.post("/:id/get-task", RequestOrderController.getByIdAndTask);
reqOrderRouter.patch("/:id/set/status", RequestOrderController.setStatus);

export default reqOrderRouter;
