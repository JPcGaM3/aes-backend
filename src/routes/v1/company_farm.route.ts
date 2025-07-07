import { Router } from "express";
import { CompanyFarmController } from "../../controllers/company_farm.controller";
import { AuthMiddleware } from "../../middlewares/current_user.middleware";

const companyFarmRouter = Router();

companyFarmRouter.get(
	"/match-operation-area",
	AuthMiddleware,
	CompanyFarmController.getByAreaNumber
);

export default companyFarmRouter;
