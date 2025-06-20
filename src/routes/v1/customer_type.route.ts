import { Router } from "express";
import { CustomerTypeController } from "../../controllers/customer_type.controller";

const customerTypeRouter = Router();

customerTypeRouter.get("/", CustomerTypeController.getAll);

export default customerTypeRouter;
