import { Router } from "express";
import { CarController } from "../../controllers/car.controller";

const carRouter = Router();

carRouter.get("/", CarController.getAll);
carRouter.patch("/:id/set/active", CarController.setActive);

export default carRouter;
