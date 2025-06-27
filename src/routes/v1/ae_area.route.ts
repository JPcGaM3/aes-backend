import { Router } from "express";
import { AEAreaController } from "../../controllers/ae_area.controller";

const aeAreaRouter = Router();

aeAreaRouter.post("/", AEAreaController.create);

aeAreaRouter.patch("/:id", AEAreaController.update);

aeAreaRouter.get("/", AEAreaController.getAll);

export default aeAreaRouter;
