import { Router } from "express";
import { CompanyFarmController } from "../../controllers/company_farm.controller";
import { AuthMiddleware } from "../../middlewares/current_user.middleware";
import { checkPermission } from "../../middlewares/rbac.middleware";

const companyFarmRouter = Router();

companyFarmRouter.get(
	"/match-operation-area",
	AuthMiddleware,
	checkPermission("company_farm", "READ"),
	CompanyFarmController.getByAreaNumber
);

export default companyFarmRouter;
