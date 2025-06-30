import { Router } from "express";
import { AEAreaController } from "../../controllers/ae_area.controller";
import { AuthMiddleware } from "../../middlewares/current_user.middleware";

const aeAreaRouter = Router();

aeAreaRouter.post("/", AuthMiddleware, AEAreaController.create);

aeAreaRouter.patch("/:id", AuthMiddleware, AEAreaController.update);

aeAreaRouter.get("/", AuthMiddleware, AEAreaController.getAll);

export default aeAreaRouter;
