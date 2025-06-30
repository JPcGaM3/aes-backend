import { Router } from "express";
import { OperationAreaController } from "../../controllers/operation_area.controller";
import { AuthMiddleware } from "../../middlewares/current_user.middleware";

const operationAreaRouter = Router();

operationAreaRouter.get("/", AuthMiddleware, OperationAreaController.getAll);
operationAreaRouter.get(
  "/:id",
  AuthMiddleware,
  OperationAreaController.getById
);
operationAreaRouter.get(
  "/match-customer-type",
  AuthMiddleware,
  OperationAreaController.getByCustomerType
);

export default operationAreaRouter;
