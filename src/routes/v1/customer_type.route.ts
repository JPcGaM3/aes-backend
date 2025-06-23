import { Router } from "express";
import { CustomerTypeController } from "../../controllers/customer_type.controller";

const customerTypeRouter = Router();

customerTypeRouter.get("/", CustomerTypeController.getAll);
customerTypeRouter.get("/:id", CustomerTypeController.getById);
customerTypeRouter.get("/:name", CustomerTypeController.getByName);

export default customerTypeRouter;
