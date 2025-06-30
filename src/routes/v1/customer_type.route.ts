import { Router } from "express";
import { CustomerTypeController } from "../../controllers/customer_type.controller";
import { AuthMiddleware } from "../../middlewares/current_user.middleware";

const customerTypeRouter = Router();

customerTypeRouter.get("/", AuthMiddleware, CustomerTypeController.getAll);
customerTypeRouter.get("/:id", AuthMiddleware, CustomerTypeController.getById);
customerTypeRouter.get(
  "/:name",
  AuthMiddleware,
  CustomerTypeController.getByName
);

export default customerTypeRouter;
