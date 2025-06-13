import { Router } from "express";
import { RequestOrderController } from "../../controllers/req_order_controllers";

const reqOrderRouter = Router();

reqOrderRouter.get("/", RequestOrderController.getAll);

export default reqOrderRouter;
