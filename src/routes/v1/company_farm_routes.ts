import { Router } from "express";
import { CompanyFarmController } from "../../controllers/company_farm_controllers";

const companyFarmRouter = Router();

companyFarmRouter.get(
  "/match-operation-area",
  CompanyFarmController.getByAreaNumber
);

export default companyFarmRouter;
