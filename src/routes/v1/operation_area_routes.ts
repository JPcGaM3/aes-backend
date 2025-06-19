import { Router } from "express";
import { OperationAreaController } from "../../controllers/operation_area_controllers";

const operationAreaRouter = Router();

operationAreaRouter.get("/", OperationAreaController.getAll);
operationAreaRouter.get(
  "/match-customer-type",
  OperationAreaController.getByCustomerType
);

export default operationAreaRouter;
