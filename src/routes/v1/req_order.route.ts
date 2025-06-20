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
reqOrderRouter.post("/getByIdAndTask", RequestOrderController.getByIdAndTask);

export default reqOrderRouter;
