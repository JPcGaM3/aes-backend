import { Router } from "express";
import { AEAreaController } from "../../controllers/ae_area.controller";

const aeAreaRouter = Router();

aeAreaRouter.get("/", AEAreaController.getAll);

export default aeAreaRouter;
