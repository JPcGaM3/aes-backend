import { Router } from "express";
import { RequestOrderController } from "../../controllers/req_order_controllers";

const reqOrderRouter = Router();

reqOrderRouter.get("/", RequestOrderController.getAll);
reqOrderRouter.post("/create", RequestOrderController.create);

export default reqOrderRouter;
